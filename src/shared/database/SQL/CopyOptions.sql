COPY public.tb_addresses_types (id, name, description) FROM stdin;
1	entrega	\N
2	cobrança	\N
3	ambos	\N
\.

SELECT pg_catalog.setval('public.tb_addresses_types_id_seq', 3, true);

COPY public.tb_genders (id, name, "personsId") FROM stdin;
1	masculino	\N
2	feminino	\N
3	outro	\N
\.

SELECT pg_catalog.setval('public.tb_genders_id_seq', 3, true);

COPY public.tb_places_types (id, name, description) FROM stdin;
1	Alameda	\N
2	Avenida	\N
3	Beco	\N
4	Bloco	\N
5	Condomínio	\N
6	Distrito	\N
7	Rua	\N
8	Residencial	\N
9	Sitio	\N
10	Vila	\N
11	Outro	\N
\.

SELECT pg_catalog.setval('public.tb_places_types_id_seq', 11, true);