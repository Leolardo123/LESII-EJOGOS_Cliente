SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE public.coupom (
    id serial NOT NULL,
    code character varying NOT NULL,
    value integer DEFAULT 0 NOT NULL,
    type character varying DEFAULT 'return_product'::character varying NOT NULL
);
ALTER TABLE public.coupom OWNER TO postgres;

CREATE TABLE public.refresh_tokens (
    id serial NOT NULL,
    access_token character varying NOT NULL,
    refresh_token character varying NOT NULL,
    user_id integer NOT NULL,
    expires_in integer NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.refresh_tokens OWNER TO postgres;

CREATE TABLE public.tb_addresses (
    id serial NOT NULL,
    cep character varying NOT NULL,
    number integer NOT NULL,
    address_type_id integer NOT NULL,
    city character varying NOT NULL,
    state character varying NOT NULL,
    country character varying NOT NULL,
    complement character varying,
    neighborhood character varying NOT NULL,
    place character varying NOT NULL,
    place_type_id integer NOT NULL
);
ALTER TABLE public.tb_addresses OWNER TO postgres;

CREATE TABLE public.tb_addresses_types (
    id serial NOT NULL,
    name character varying NOT NULL,
    description character varying
);
ALTER TABLE public.tb_addresses_types OWNER TO postgres;

CREATE TABLE public.tb_brand (
    id serial NOT NULL,
    name character varying NOT NULL,
    image character varying NOT NULL
);
ALTER TABLE public.tb_brand OWNER TO postgres;

CREATE TABLE public.tb_cards (
    id serial NOT NULL,
    owner_name character varying NOT NULL,
    number character varying NOT NULL,
    brand_id integer NOT NULL,
    person_id integer NOT NULL,
    security_code character varying NOT NULL
);
ALTER TABLE public.tb_cards OWNER TO postgres;

CREATE TABLE public.tb_carts_items (
    id serial NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL
);
ALTER TABLE public.tb_carts_items OWNER TO postgres;

CREATE TABLE public.tb_genders (
    id serial NOT NULL,
    name character varying NOT NULL
);
ALTER TABLE public.tb_genders OWNER TO postgres;

CREATE TABLE public.tb_item_carts (
    id serial NOT NULL,
    total_price integer NOT NULL,
    person_id integer NOT NULL,
    status character varying DEFAULT 'open'::character varying NOT NULL
);
ALTER TABLE public.tb_item_carts OWNER TO postgres;

CREATE TABLE public.tb_person_addresses (
    id serial NOT NULL,
    person_id integer NOT NULL,
    address_id integer NOT NULL
);
ALTER TABLE public.tb_person_addresses OWNER TO postgres;

CREATE TABLE public.tb_persons (
    id serial NOT NULL,
    name character varying NOT NULL,
    cpf character varying NOT NULL,
    birth_date timestamp without time zone NOT NULL,
    gender_id integer NOT NULL,
    user_id integer NOT NULL
);
ALTER TABLE public.tb_persons OWNER TO postgres;

CREATE TABLE public.tb_phones (
    id serial NOT NULL,
    number character varying NOT NULL,
    ddd integer NOT NULL,
    person_id integer NOT NULL
);
ALTER TABLE public.tb_phones OWNER TO postgres;

CREATE TABLE public.tb_places_types (
    id serial NOT NULL,
    name character varying NOT NULL,
    description character varying
);
ALTER TABLE public.tb_places_types OWNER TO postgres;

CREATE TABLE public.tb_products (
    id serial NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price double precision NOT NULL,
    stock integer NOT NULL,
    requirements character varying NOT NULL,
    publisher character varying NOT NULL,
    developer character varying NOT NULL,
    language character varying NOT NULL,
    subtitle character varying NOT NULL,
    release_date character varying NOT NULL,
    image character varying NOT NULL
);
ALTER TABLE public.tb_products OWNER TO postgres;

CREATE TABLE public.tb_purchases (
    id serial NOT NULL,
    total_price integer NOT NULL,
    cart_id integer NOT NULL,
    payment_id integer NOT NULL,
    person_id integer NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL
);
ALTER TABLE public.tb_purchases OWNER TO postgres;

CREATE TABLE public.tb_purchases_coupons (
    id serial NOT NULL,
    coupon_id integer NOT NULL,
    purchase_id integer NOT NULL
);
ALTER TABLE public.tb_purchases_coupons OWNER TO postgres;

CREATE TABLE public.tb_users (
    id serial NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'Padrao'::character varying NOT NULL
);

ALTER TABLE public.tb_users OWNER TO postgres;

ALTER TABLE ONLY public.tb_products
    ADD CONSTRAINT "PK_26292104cb895b49349b5353003" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_persons
    ADD CONSTRAINT "PK_2af079ba897e0e01ca2ae609e42" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_person_addresses
    ADD CONSTRAINT "PK_407b70f79c3a8e88a5f79713299" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_carts_items
    ADD CONSTRAINT "PK_480709bba97ca7979bf298bca64" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_cards
    ADD CONSTRAINT "PK_6dea528d0de1b4ea34bcff34200" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_purchases
    ADD CONSTRAINT "PK_7cad9595706b9a2dcf6ac28e1e7" PRIMARY KEY (id);

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_addresses
    ADD CONSTRAINT "PK_86c23d37552ae8e71ecbcfd46d9" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_purchases_coupons
    ADD CONSTRAINT "PK_8ae2cc317cfc0ca750cce8723a1" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_phones
    ADD CONSTRAINT "PK_91419dd4de201e2b2eb80a9faf7" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_brand
    ADD CONSTRAINT "PK_928f649ba57cedcea7b2294d122" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_users
    ADD CONSTRAINT "PK_a2c23e0679749c22ffa6c2be910" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_addresses_types
    ADD CONSTRAINT "PK_aae6705201c6fc0f9e792bd101b" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_genders
    ADD CONSTRAINT "PK_ad4433ee86ecc6885a91b560532" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_places_types
    ADD CONSTRAINT "PK_c53e8458e5e67a3ea19fb918119" PRIMARY KEY (id);

ALTER TABLE ONLY public.coupom
    ADD CONSTRAINT "PK_dac9504d91710ffbdd15752cb7a" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_item_carts
    ADD CONSTRAINT "PK_f1effbae54a68fdaffee971b8d8" PRIMARY KEY (id);

ALTER TABLE ONLY public.tb_phones
    ADD CONSTRAINT "REL_26973d11e13ec316b40eae12f6" UNIQUE (person_id);

ALTER TABLE ONLY public.tb_person_addresses
    ADD CONSTRAINT "REL_a78b61626faf2959ca29a81a1f" UNIQUE (address_id);

ALTER TABLE ONLY public.tb_persons
    ADD CONSTRAINT "REL_f0dc0d17f29a844a6089e0aef8" UNIQUE (user_id);

ALTER TABLE ONLY public.tb_purchases_coupons
    ADD CONSTRAINT "UQ_22ddfcbd6c920c56d23f4634c72" UNIQUE (purchase_id, coupon_id);

ALTER TABLE ONLY public.tb_carts_items
    ADD CONSTRAINT "UQ_c1d9b1541a4feb420184fe38c35" UNIQUE (cart_id, product_id);

ALTER TABLE ONLY public.tb_phones
    ADD CONSTRAINT "FK_26973d11e13ec316b40eae12f6e" FOREIGN KEY (person_id) REFERENCES public.tb_persons(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.tb_cards
    ADD CONSTRAINT "FK_26d44dc906b92c061a6320cd850" FOREIGN KEY (person_id) REFERENCES public.tb_persons(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY (user_id) REFERENCES public.tb_users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.tb_carts_items
    ADD CONSTRAINT "FK_5774aa25e0ef26d96bd5e22e677" FOREIGN KEY (product_id) REFERENCES public.tb_products(id);

ALTER TABLE ONLY public.tb_item_carts
    ADD CONSTRAINT "FK_6198283317c14c90c8ff69fd2f6" FOREIGN KEY (person_id) REFERENCES public.tb_persons(id);

ALTER TABLE ONLY public.tb_addresses
    ADD CONSTRAINT "FK_6dafc292779632e155ff084e5ad" FOREIGN KEY (address_type_id) REFERENCES public.tb_addresses_types(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.tb_addresses
    ADD CONSTRAINT "FK_7352dc4c7b4d9fb966c9a8b72a3" FOREIGN KEY (place_type_id) REFERENCES public.tb_places_types(id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY public.tb_purchases_coupons
    ADD CONSTRAINT "FK_87d36bdfd59dd6885cc01ebde7f" FOREIGN KEY (purchase_id) REFERENCES public.tb_purchases(id);

ALTER TABLE ONLY public.tb_persons
    ADD CONSTRAINT "FK_91f282ce53f7a991adfae356acb" FOREIGN KEY (gender_id) REFERENCES public.tb_genders(id);

ALTER TABLE ONLY public.tb_person_addresses
    ADD CONSTRAINT "FK_a78b61626faf2959ca29a81a1fa" FOREIGN KEY (address_id) REFERENCES public.tb_addresses(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.tb_cards
    ADD CONSTRAINT "FK_bac77410e8bada5ac04ebc0c039" FOREIGN KEY (brand_id) REFERENCES public.tb_brand(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.tb_person_addresses
    ADD CONSTRAINT "FK_c0f6ed782aa9c4dfaab613aa9d7" FOREIGN KEY (person_id) REFERENCES public.tb_persons(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.tb_carts_items
    ADD CONSTRAINT "FK_e0a135c6703cbc2799f0c67dd17" FOREIGN KEY (cart_id) REFERENCES public.tb_item_carts(id);

ALTER TABLE ONLY public.tb_persons
    ADD CONSTRAINT "FK_f0dc0d17f29a844a6089e0aef86" FOREIGN KEY (user_id) REFERENCES public.tb_users(id) ON UPDATE CASCADE ON DELETE CASCADE;