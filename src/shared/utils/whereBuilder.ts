interface IParameter {
  column: string;
  value: any;
  method?: 'AND' | 'OR';
  isBetweenDate?: boolean;
  isNot?: boolean;
  isIn?: boolean;
  isLike?: boolean;
  isDate?: boolean;
  inRange?: boolean;
  any?: boolean;
}

interface IParameters {
  parameters: IParameter[];
}

export default function whereBuilder({
  parameters,
}: IParameters): string {
  let whereString = '';
  const valuesObject: Record<string, any> = {};

  if (parameters.length === 0) {
    return '';
  }

  parameters.map(parameter => {
    let { value } = parameter;

    if (parameter.isIn && parameter.isLike) {
      throw new Error(
        'Não é possível filtrar um parâmetro por isIn e isLike',
      );
    }

    if (parameter.value) {
      if (typeof parameter.value === 'string' && parameter.isIn) {
        value = Array(value);
      }

      if (whereString.length !== 0) {
        whereString += ` ${parameter.method} `;
      }

      if (parameter.isBetweenDate) {
        if (parameter.value.length !== 0) {
          whereString += `${parameter.column} BETWEEN to_timestamp(value1) AND to_timestamp(value2)`;
          valuesObject.value1 = `${parameter.value[0]}`;
          valuesObject.value2 = `${parameter.value[1]}`;
        }

        return null;
      }

      if (parameter.isNot) {
        whereString += ` NOT `;
      }

      if (parameter.isIn) {
        whereString += `${parameter.value} IN (${parameter.column})`;
      } else if (parameter.any) {
        whereString += `${parameter.column} = ANY(${parameter.value})`;
      } else if (parameter.isLike) {
        whereString += `LOWER(${parameter.column}) LIKE LOWER(${parameter.value})`;
      } else if (parameter.isDate) {
        whereString += `
        ${parameter.column} 
        BETWEEN to_timestamp(${parameter.value[0]}) 
        AND to_timestamp(${parameter.value[1]})`;

      } else {
        whereString += `${parameter.column} = ${parameter.value} `;
      }

      valuesObject[parameter.value] = parameter.isLike
        ? `%${value}%`
        : value;
    }

    return null;
  });

  return whereString.length === 0
    ? ''
    : 'WHERE '+whereString;
}
