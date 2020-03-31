--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6 (Ubuntu 11.6-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.6 (Ubuntu 11.6-1.pgdg18.04+1)

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

--
-- Name: availability; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.availability (
    availability_id integer NOT NULL,
    sle_id integer,
    start_time double precision,
    day_of_week integer
);


--
-- Name: availability_availability_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.availability_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: availability_availability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.availability_availability_id_seq OWNED BY public.availability.availability_id;


--
-- Name: coverrequests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.coverrequests (
    request_id integer NOT NULL,
    coverer_id integer,
    coveree_id integer,
    shift_id integer,
    supervisor_status character varying(30),
    notes character varying(100)
);


--
-- Name: coverrequests_request_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.coverrequests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: coverrequests_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.coverrequests_request_id_seq OWNED BY public.coverrequests.request_id;


--
-- Name: shifts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shifts (
    shift_id integer NOT NULL,
    sle_id integer,
    location character varying(30),
    start_time timestamp without time zone,
    end_time timestamp without time zone
);


--
-- Name: shifts_shift_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shifts_shift_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shifts_shift_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shifts_shift_id_seq OWNED BY public.shifts.shift_id;


--
-- Name: sle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sle (
    id integer NOT NULL,
    name character varying(40),
    training_level_doe integer,
    training_level_moffitt integer,
    email character varying(40),
    password character varying(40)
);


--
-- Name: sle_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sle_id_seq OWNED BY public.sle.id;


--
-- Name: supervisor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.supervisor (
    id integer NOT NULL,
    name character varying(30),
    email character varying(30),
    password character varying(30)
);


--
-- Name: supervisor_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.supervisor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: supervisor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.supervisor_id_seq OWNED BY public.supervisor.id;


--
-- Name: availability availability_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.availability ALTER COLUMN availability_id SET DEFAULT nextval('public.availability_availability_id_seq'::regclass);


--
-- Name: coverrequests request_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coverrequests ALTER COLUMN request_id SET DEFAULT nextval('public.coverrequests_request_id_seq'::regclass);


--
-- Name: shifts shift_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shifts ALTER COLUMN shift_id SET DEFAULT nextval('public.shifts_shift_id_seq'::regclass);


--
-- Name: sle id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sle ALTER COLUMN id SET DEFAULT nextval('public.sle_id_seq'::regclass);


--
-- Name: supervisor id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supervisor ALTER COLUMN id SET DEFAULT nextval('public.supervisor_id_seq'::regclass);


--
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.availability (availability_id, sle_id, start_time, day_of_week) FROM stdin;
1	1	9	1
2	1	10	1
3	1	11	1
4	1	12	1
5	1	8	2
6	1	9	2
7	2	14	3
8	2	15	3
\.


--
-- Data for Name: coverrequests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.coverrequests (request_id, coverer_id, coveree_id, shift_id, supervisor_status, notes) FROM stdin;
1	1	2	1	Approved	Sick
2	2	1	2	null	Going
\.


--
-- Data for Name: shifts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.shifts (shift_id, sle_id, location, start_time, end_time) FROM stdin;
4	1	Doe	2019-03-05 02:00:00	2019-03-05 04:00:00
5	1	Doe	2019-03-06 02:00:00	2019-03-06 12:00:00
6	1	Doe	2019-03-07 02:00:00	2019-03-07 12:00:00
7	2	Moffitt	2019-03-03 00:00:00	2019-03-07 10:00:00
8	2	Moffitt	2019-03-05 00:00:00	2019-03-05 10:00:00
9	2	Moffitt	2019-03-07 00:00:00	2019-03-07 10:00:00
10	3	Moffitt	2019-03-04 00:00:00	2019-03-04 10:00:00
11	3	Moffitt	2019-03-06 00:00:00	2019-03-06 10:00:00
12	3	Moffitt	2019-03-08 00:00:00	2019-03-08 14:00:00
13	4	Moffitt	2019-03-03 03:00:00	2019-03-08 14:00:00
14	4	Moffitt	2019-03-04 03:00:00	2019-03-04 14:00:00
15	5	Moffitt	2019-03-05 03:00:00	2019-03-05 14:00:00
16	5	Moffitt	2019-03-06 03:00:00	2019-03-06 14:00:00
17	2	Doe	2019-03-03 00:00:00	2019-03-03 10:00:00
18	4	Moffitt	2019-03-03 00:00:00	2019-03-03 10:00:00
20	1	Moffitt	2019-03-04 04:00:00	2019-03-04 06:00:00
\.


--
-- Data for Name: sle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sle (id, name, training_level_doe, training_level_moffitt, email, password) FROM stdin;
1	brian	3	3	bdeleonardis@berkeley.edu	bripass
2	bianca	1	1	biancalee@berkeley.edu	biapass
3	Sahil	3	2	sahil@berkeley.edu	sahil
4	Kat	3	2	Kat@berkeley.edu	Kat
5	Kerry	2	2	Kerry@berkeley.edu	Kerry
\.


--
-- Data for Name: supervisor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.supervisor (id, name, email, password) FROM stdin;
1	nancy	nancy@berkeley.edu	nancyisboss
2	joey	joeyjoey@berkeley.edu	joeyiscool
\.


--
-- Name: availability_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.availability_availability_id_seq', 8, true);


--
-- Name: coverrequests_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coverrequests_request_id_seq', 2, true);


--
-- Name: shifts_shift_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shifts_shift_id_seq', 20, true);


--
-- Name: sle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sle_id_seq', 5, true);


--
-- Name: supervisor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.supervisor_id_seq', 2, true);


--
-- Name: availability availability_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY (availability_id);


--
-- Name: coverrequests coverrequests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coverrequests
    ADD CONSTRAINT coverrequests_pkey PRIMARY KEY (request_id);


--
-- Name: shifts shifts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_pkey PRIMARY KEY (shift_id);


--
-- Name: sle sle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sle
    ADD CONSTRAINT sle_pkey PRIMARY KEY (id);


--
-- Name: supervisor supervisor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.supervisor
    ADD CONSTRAINT supervisor_pkey PRIMARY KEY (id);


--
-- Name: availability availability_sle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_sle_id_fkey FOREIGN KEY (sle_id) REFERENCES public.sle(id);


--
-- Name: coverrequests coverrequests_coveree_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coverrequests
    ADD CONSTRAINT coverrequests_coveree_id_fkey FOREIGN KEY (coveree_id) REFERENCES public.sle(id);


--
-- Name: coverrequests coverrequests_coverer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.coverrequests
    ADD CONSTRAINT coverrequests_coverer_id_fkey FOREIGN KEY (coverer_id) REFERENCES public.sle(id);


--
-- Name: shifts shifts_sle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_sle_id_fkey FOREIGN KEY (sle_id) REFERENCES public.sle(id);


--
-- PostgreSQL database dump complete
--

