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
-- Name: schedule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedule (
    sle_id integer,
    day_of_week character varying(30),
    location character varying(30),
    start_time double precision,
    end_time double precision,
    coverrequested boolean
);


--
-- Name: shifts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shifts (
    shift_id integer NOT NULL,
    sle_id integer,
    location character varying(30),
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    cover_requested character varying
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
    training_level_moffitt3 integer,
    email character varying(40),
    password character varying(40),
    training_level_moffitt4 integer,
    salt character varying(40)
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
    password character varying(40),
    salt character varying(40)
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
924	1	0	2
925	1	0	0
926	1	0	3
927	1	1	3
928	1	0	4
929	1	1	4
930	1	1.5	2
931	1	1.5	3
932	1	0.5	0
933	1	0.5	4
934	1	0.5	2
935	1	1.5	4
936	1	2	2
937	1	0.5	3
938	1	2	4
939	1	2	5
940	1	2	3
941	1	2	6
942	1	1	2
943	1	2.5	3
944	1	2.5	2
945	1	2.5	4
946	1	2.5	5
947	1	2.5	6
948	1	3	2
949	1	3	3
950	1	3	4
951	1	3	5
952	1	3	6
953	1	3.5	2
954	1	3.5	3
955	1	3.5	4
956	1	3.5	5
957	1	3.5	6
958	1	4	2
959	1	4	3
960	1	4	4
961	1	4	5
962	1	4	6
963	1	4.5	2
964	1	4.5	3
965	1	4.5	4
966	1	4.5	5
967	1	4.5	6
968	1	5	2
969	1	5	3
970	1	5	4
971	1	5	5
972	1	5	6
973	1	5.5	2
974	1	5.5	3
975	1	5.5	4
976	1	5.5	5
977	1	5.5	6
978	1	6	2
979	1	6	3
980	1	6	4
981	1	6	5
982	1	6	6
983	1	6.5	2
984	1	6.5	3
985	1	6.5	4
986	1	6.5	5
987	1	6.5	6
988	1	7	2
989	1	7	3
990	1	7	4
991	1	7	5
992	1	7	6
993	1	7.5	2
994	1	7.5	3
995	1	7.5	4
996	1	7.5	5
997	1	7.5	6
998	1	8	0
999	1	8	1
1000	1	8	2
1001	1	8	3
1002	1	8	4
1003	1	8	5
1004	1	8	6
1005	1	8.5	0
1006	1	8.5	1
1007	1	8.5	2
1008	1	8.5	3
1009	1	8.5	4
1010	1	8.5	5
1011	1	8.5	6
1023	1	9.5	4
1034	1	10.5	1
1044	1	11	4
1054	1	12	0
1064	1	12.5	3
1072	1	13	4
1083	1	14	1
1097	1	15.5	0
1108	1	17	0
1118	1	18.5	1
1012	1	9	0
1024	1	9.5	5
1032	1	10	6
1042	1	11	2
1049	1	11.5	2
1057	1	12	3
1069	1	13	1
1079	1	13.5	4
1085	1	14	3
1095	1	15	3
1105	1	16.5	0
1116	1	18	2
1013	1	9	1
1021	1	9.5	2
1029	1	10	3
1039	1	10.5	6
1052	1	11.5	5
1060	1	12	6
1073	1	13	5
1084	1	14	2
1096	1	15	4
1107	1	16.5	2
1120	1	19	0
1014	1	9	2
1022	1	9.5	3
1033	1	10.5	0
1041	1	11	1
1050	1	11.5	3
1062	1	12.5	1
1070	1	13	2
1081	1	13.5	6
1091	1	14.5	4
1102	1	16	0
1112	1	17.5	1
1125	1	19.5	2
1015	1	9	3
1025	1	9.5	6
1036	1	10.5	3
1047	1	11.5	0
1058	1	12	4
1067	1	12.5	6
1075	1	13.5	0
1086	1	14	4
1094	1	15	2
1101	1	15.5	4
1109	1	17	1
1117	1	18.5	0
1016	1	9	4
1026	1	10	0
1035	1	10.5	2
1045	1	11	5
1053	1	11.5	6
1065	1	12.5	4
1077	1	13.5	2
1088	1	14.5	1
1100	1	15.5	3
1111	1	17.5	0
1119	1	18.5	2
1017	1	9	5
1028	1	10	2
1040	1	11	0
1051	1	11.5	4
1061	1	12.5	0
1074	1	13	6
1082	1	14	0
1090	1	14.5	3
1098	1	15.5	1
1106	1	16.5	1
1114	1	18	0
1123	1	19.5	0
1018	1	9	6
1027	1	10	1
1037	1	10.5	4
1046	1	11	6
1055	1	12	1
1066	1	12.5	5
1076	1	13.5	1
1087	1	14.5	0
1093	1	15	1
1103	1	16	1
1113	1	17.5	2
1124	1	19.5	1
1019	1	9.5	0
1031	1	10	5
1043	1	11	3
1056	1	12	2
1063	1	12.5	2
1071	1	13	3
1078	1	13.5	3
1089	1	14.5	2
1099	1	15.5	2
1110	1	17	2
1121	1	19	1
1020	1	9.5	1
1030	1	10	4
1038	1	10.5	5
1048	1	11.5	1
1059	1	12	5
1068	1	13	0
1080	1	13.5	5
1092	1	15	0
1104	1	16	2
1115	1	18	1
1122	1	19	2
1126	2	1	5
1127	2	1.5	3
1128	2	1	6
1129	2	1.5	6
1130	2	2.5	1
1131	2	1	3
1132	2	2.5	2
1133	2	2	6
1134	2	2.5	3
1135	2	2	2
1136	2	2.5	5
1137	2	2	3
1138	2	1.5	5
1139	2	2.5	6
1140	2	3	1
1141	2	3	2
1142	2	3	3
1143	2	3	4
1144	2	3	5
1145	2	2	5
1146	2	3	6
1147	2	3.5	1
1148	2	3.5	2
1149	2	3.5	3
1150	2	3.5	4
1151	2	3.5	5
1152	2	3.5	6
1153	2	4	2
1154	2	4	3
1155	2	4	5
1156	2	4	6
1157	2	4.5	2
1158	2	4.5	3
1159	2	4.5	5
1160	2	4.5	6
1161	2	5	1
1162	2	5	2
1163	2	5	3
1164	2	5	5
1165	2	5	6
1166	2	5.5	1
1167	2	5.5	2
1168	2	5.5	3
1169	2	5.5	5
1170	2	6	5
1171	2	6	2
1172	2	6	3
1173	2	6	6
1174	2	5.5	6
1175	2	6.5	3
1176	2	6.5	5
1177	2	6.5	6
1178	2	7	3
1179	2	7	5
1180	2	7	6
1181	2	7.5	3
1182	2	7.5	5
1183	2	7.5	6
1184	2	8	0
1185	2	8	3
1186	2	8	5
1187	2	8	6
1188	2	8.5	0
1189	2	8.5	3
1190	2	8.5	5
1191	2	8.5	6
1192	2	9	0
1193	2	9	3
1194	2	9	5
1195	2	9	6
1196	2	9.5	0
1197	2	9.5	3
1198	2	9.5	5
1199	2	9.5	6
1200	2	10	3
1201	2	10	5
1202	2	10	6
1203	2	10.5	3
1204	2	10.5	5
1205	2	10.5	6
1206	2	11	3
1207	2	11	5
1208	2	11	6
1209	2	11.5	3
1210	2	11.5	5
1211	2	11.5	6
1212	2	12	3
1213	2	12	5
1214	2	12	6
1215	2	12.5	3
1216	2	12.5	5
1217	2	12.5	6
1218	2	13	0
1219	2	13	5
1220	2	13	6
1221	2	13.5	0
1222	2	13.5	5
1223	2	13.5	6
1224	2	14	0
1225	2	14	5
1226	2	14	6
1227	2	14.5	0
1228	2	14.5	5
1229	2	14.5	6
1230	2	15	0
1231	2	15	5
1232	2	15	6
1233	2	15.5	0
1234	2	15.5	5
1235	2	15.5	6
1236	2	16	0
1237	2	16	5
1238	2	16	6
1239	2	16.5	0
1240	2	16.5	5
1241	2	16.5	6
1242	2	17	5
1243	2	17	6
1244	2	17.5	5
1245	2	17.5	6
1246	2	18	5
1247	2	18	6
1248	2	18.5	5
1249	2	18.5	6
1250	2	19	5
1251	2	19	6
1252	2	19.5	5
1253	2	19.5	6
1254	2	20	5
1255	2	20	6
1256	2	20.5	5
1257	2	20.5	6
1258	2	21	5
1259	2	21	6
1260	2	21.5	5
1261	2	21.5	6
1262	2	22	5
1263	2	22	6
1264	2	22.5	5
1265	2	22.5	6
1266	3	0	1
1267	3	0	3
1268	3	0	5
1269	3	0	0
1270	3	0.5	1
1271	3	1	1
1272	3	1	3
1274	3	1.5	0
1285	3	2.5	0
1291	3	3	1
1302	3	4.5	0
1312	3	5.5	3
1322	3	7	0
1331	3	8	1
1336	3	8.5	3
1342	3	9.5	0
1352	3	10.5	3
1355	3	11	1
1365	3	12	5
1373	3	13	5
1392	3	15.5	3
1402	3	17	0
1409	3	17.5	5
1415	3	18.5	1
1426	3	20	0
1437	3	21	5
1447	3	22.5	1
1273	3	1	5
1275	3	0.5	0
1276	3	1.5	1
1278	3	1	0
1282	3	2	3
1287	3	2.5	1
1295	3	3.5	1
1296	3	3.5	3
1298	3	4	0
1305	3	4.5	5
1306	3	5	0
1307	3	5	1
1314	3	6	0
1317	3	6	5
1318	3	6.5	0
1324	3	7	3
1326	3	7.5	0
1328	3	7.5	3
1335	3	8.5	1
1338	3	9	0
1339	3	9	1
1346	3	10	0
1348	3	10	3
1351	3	10.5	1
1358	3	11.5	0
1362	3	12	0
1363	3	12	1
1368	3	12.5	3
1372	3	13	3
1375	3	13.5	1
1379	3	14	1
1380	3	14	3
1385	3	14.5	5
1388	3	15	3
1391	3	15.5	1
1393	3	15.5	5
1398	3	16.5	0
1399	3	16.5	1
1401	3	16.5	5
1404	3	17	3
1410	3	18	0
1411	3	18	1
1414	3	18.5	0
1420	3	19	3
1421	3	19	5
1423	3	19.5	1
1429	3	20	5
1431	3	20.5	1
1435	3	21	1
1439	3	21.5	1
1444	3	22	3
1445	3	22	5
1277	3	1.5	3
1283	3	2	5
1289	3	2.5	5
1297	3	3.5	5
1308	3	5	3
1320	3	6.5	3
1330	3	8	0
1340	3	9	3
1350	3	10.5	0
1360	3	11.5	3
1370	3	13	0
1381	3	14	5
1390	3	15.5	0
1396	3	16	3
1406	3	17.5	0
1417	3	18.5	5
1425	3	19.5	5
1432	3	20.5	3
1441	3	21.5	5
1279	3	1.5	5
1280	3	0.5	5
1281	3	0.5	3
1288	3	2.5	3
1290	3	3	0
1294	3	3.5	0
1299	3	4	1
1301	3	4	5
1304	3	4.5	3
1310	3	5.5	0
1313	3	5.5	5
1315	3	6	1
1321	3	6.5	5
1323	3	7	1
1325	3	7	5
1332	3	8	3
1333	3	8	5
1334	3	8.5	0
1343	3	9.5	1
1344	3	9.5	3
1345	3	9.5	5
1353	3	10.5	5
1354	3	11	0
1356	3	11	3
1359	3	11.5	1
1364	3	12	3
1366	3	12.5	0
1369	3	12.5	5
1376	3	13.5	3
1377	3	13.5	5
1378	3	14	0
1383	3	14.5	1
1386	3	15	0
1387	3	15	1
1394	3	16	0
1400	3	16.5	3
1403	3	17	1
1405	3	17	5
1412	3	18	3
1413	3	18	5
1418	3	19	0
1422	3	19.5	0
1424	3	19.5	3
1428	3	20	3
1433	3	20.5	5
1434	3	21	0
1440	3	21.5	3
1442	3	22	0
1443	3	22	1
1449	3	22.5	5
1284	3	2	0
1293	3	3	5
1303	3	4.5	1
1311	3	5.5	1
1316	3	6	3
1327	3	7.5	1
1337	3	8.5	5
1347	3	10	1
1357	3	11	5
1367	3	12.5	1
1374	3	13.5	0
1384	3	14.5	3
1395	3	16	1
1407	3	17.5	1
1416	3	18.5	3
1427	3	20	1
1438	3	21.5	0
1446	3	22.5	0
1286	3	2	1
1292	3	3	3
1300	3	4	3
1309	3	5	5
1319	3	6.5	1
1329	3	7.5	5
1341	3	9	5
1349	3	10	5
1361	3	11.5	5
1371	3	13	1
1382	3	14.5	0
1389	3	15	5
1397	3	16	5
1408	3	17.5	3
1419	3	19	1
1430	3	20.5	0
1436	3	21	3
1448	3	22.5	3
1451	4	1	5
1453	4	2	1
1454	4	1.5	1
1455	4	2	0
1456	4	2	3
1457	4	2	5
1458	4	2.5	0
1459	4	2.5	1
1460	4	1	1
1461	4	2.5	3
1462	4	1.5	3
1463	4	3	0
1464	4	3	1
1465	4	1.5	0
1466	4	3	3
1467	4	3	5
1468	4	1.5	5
1469	4	2.5	5
1470	4	3.5	0
1471	4	3.5	1
1472	4	3.5	3
1473	4	3.5	5
1474	4	4	0
1475	4	4	1
1476	4	4	3
1477	4	4	5
1478	4	4.5	0
1479	4	4.5	1
1480	4	4.5	3
1481	4	4.5	5
1482	4	5	0
1483	4	5	1
1484	4	5	3
1485	4	5	5
1486	4	5.5	0
1487	4	5.5	1
1488	4	5.5	3
1489	4	5.5	5
1490	4	6	0
1491	4	6	1
1492	4	6	3
1493	4	6	5
1494	4	6.5	0
1495	4	6.5	1
1496	4	6.5	3
1497	4	6.5	5
1498	4	7	0
1499	4	7	1
1500	4	7	3
1501	4	7	5
1502	4	7.5	0
1503	4	7.5	1
1504	4	7.5	3
1505	4	7.5	5
1506	4	8	0
1507	4	8	1
1508	4	8	3
1509	4	8	5
1510	4	8.5	0
1511	4	8.5	1
1512	4	8.5	3
1513	4	9	0
1514	4	9	1
1515	4	9	3
1516	4	9	5
1517	4	9.5	0
1518	4	9.5	1
1519	4	9.5	5
1520	4	10	0
1521	4	10	1
1522	4	9.5	3
1523	4	10	3
1524	4	10	5
1525	4	10.5	0
1526	4	10.5	1
1527	4	8.5	5
1528	4	10.5	3
1529	4	10.5	5
1530	4	11	0
1531	4	11	1
1532	4	11	3
1533	4	11	5
1534	4	11.5	0
1535	4	11.5	3
1536	4	11.5	5
1537	4	12	0
1538	4	12	1
1539	4	12	3
1540	4	12	5
1541	4	12.5	0
1542	4	11.5	1
1543	4	12.5	1
1544	4	12.5	5
1545	4	13	0
1546	4	13	3
1547	4	13.5	0
1548	4	13.5	3
1549	4	14	0
1550	4	14	3
1551	4	14.5	0
1552	4	12.5	3
1553	4	14.5	3
1554	4	15	0
1555	4	15	3
1556	4	15.5	0
1557	4	16	0
1558	4	16.5	0
1559	4	16.5	3
1560	4	17	0
1561	4	17	3
1562	4	17.5	0
1563	4	17.5	3
1564	4	18	0
1565	4	18	3
1566	4	16	3
1567	4	15.5	3
1568	4	18.5	0
1569	4	18.5	3
1570	4	19	0
1571	4	19.5	0
1572	4	19	3
1573	4	19.5	3
1574	4	20	0
1575	4	20	3
1576	4	20.5	0
1577	4	20.5	3
1578	4	21	0
1579	4	21	3
1580	4	21.5	0
1581	4	21.5	3
1582	4	22	0
1583	4	22	3
1584	4	22.5	0
1585	4	22.5	3
\.


--
-- Data for Name: coverrequests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.coverrequests (request_id, coverer_id, coveree_id, shift_id, supervisor_status, notes) FROM stdin;
14	\N	1	701	\N	\N
15	\N	2	722	\N	I want to
16	2	1	719	Approved	Im sick
17	\N	2	716	\N	Cause I would like to
18	\N	2	723	\N	Ya ya ya
19	2	1	757	Approved	Im sick
20	5	4	766	\N	I have a date
21	\N	3	763	\N	I have a final
\.


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.schedule (sle_id, day_of_week, location, start_time, end_time, coverrequested) FROM stdin;
1	tue	Doe	4.5	5	f
1	tue	Doe	0.5	1	f
1	tue	Doe	5	5.5	f
1	tue	Doe	5.5	6	f
1	tue	Doe	3.5	4	f
1	tue	Doe	2.5	3	f
1	tue	Doe	3	3.5	f
1	tue	Doe	1	1.5	f
1	tue	Doe	6.5	7	f
1	tue	Doe	1.5	2	f
1	tue	Doe	7	7.5	f
1	tue	Doe	2	2.5	f
1	tue	Doe	7.5	8	f
1	tue	Doe	8	8.5	f
1	tue	Doe	8.5	9	f
1	tue	Doe	9	9.5	f
1	tue	Doe	9.5	10	f
1	tue	Doe	0	0.5	f
1	tue	Doe	10	10.5	f
1	tue	Doe	10.5	11	f
1	tue	Doe	4	4.5	f
1	tue	Doe	11	11.5	f
1	tue	Doe	11.5	12	f
1	tue	Doe	12	12.5	f
1	tue	Doe	12.5	13	f
1	tue	Doe	13	13.5	f
1	tue	Doe	13.5	14	f
1	tue	Doe	14	14.5	f
1	tue	Doe	14.5	15	f
1	tue	Doe	15	15.5	f
1	tue	Doe	15.5	16	f
1	tue	Doe	16	16.5	f
1	tue	Doe	16.5	17	f
1	tue	Doe	17	17.5	f
1	tue	Doe	17.5	18	f
1	tue	Doe	18	18.5	f
1	tue	Doe	18.5	19	f
1	tue	Doe	19	19.5	f
1	tue	Doe	19.5	20	f
1	thu	Doe	0	0.5	f
1	thu	Doe	0.5	1	f
1	thu	Doe	1	1.5	f
1	thu	Doe	1.5	2	f
1	thu	Doe	2	2.5	f
1	thu	Doe	2.5	3	f
1	thu	Doe	3	3.5	f
1	thu	Doe	3.5	4	f
1	thu	Doe	4	4.5	f
1	thu	Doe	4.5	5	f
1	thu	Doe	5	5.5	f
1	thu	Doe	5.5	6	f
1	thu	Doe	6	6.5	f
1	thu	Doe	6.5	7	f
1	thu	Doe	7	7.5	f
1	thu	Doe	7.5	8	f
1	thu	Doe	8	8.5	f
1	thu	Doe	8.5	9	f
1	thu	Doe	9	9.5	f
1	thu	Doe	9.5	10	f
1	thu	Doe	10	10.5	f
1	thu	Doe	10.5	11	f
1	thu	Doe	11	11.5	f
1	thu	Doe	11.5	12	f
1	thu	Doe	12	12.5	f
1	thu	Doe	12.5	13	f
1	thu	Doe	13	13.5	f
1	thu	Doe	13.5	14	f
1	thu	Doe	14	14.5	f
1	thu	Doe	14.5	15	f
1	thu	Doe	15	15.5	f
1	mon	Doe	14.5	15	f
1	mon	Doe	19.5	20	f
1	wed	Doe	4.5	5	f
1	sat	Doe	6	6.5	f
1	sat	Doe	11	11.5	f
1	sun	Moffitt3	11.5	12	f
1	sun	Moffitt3	17	17.5	f
1	mon	Moffitt3	9	9.5	f
1	wed	Moffitt3	13	13.5	f
1	wed	Moffitt3	10.5	11	f
1	fri	Moffitt3	10.5	11	f
1	wed	Moffitt3	6.5	7	f
1	fri	Moffitt3	3	3.5	f
1	fri	Moffitt3	7	7.5	f
2	sat	Doe	5	5.5	f
2	sat	Doe	16	16.5	f
2	sat	Doe	19.5	20	f
2	sat	Doe	22.5	23	f
2	thu	Doe	3	3.5	f
2	fri	Doe	18	18.5	f
2	sat	Doe	7	7.5	f
2	sat	Doe	12	12.5	f
2	fri	Doe	12	12.5	f
2	mon	Moffitt3	3	3.5	f
2	wed	Moffitt3	3.5	4	f
2	fri	Moffitt3	2	2.5	f
2	fri	Moffitt3	6.5	7	f
2	sun	Moffitt3	8.5	9	f
2	wed	Moffitt3	12.5	13	f
3	sun	Doe	5	5.5	f
3	mon	Doe	4	4.5	f
3	mon	Doe	21.5	22	f
3	fri	Doe	1.5	2	f
3	sun	Doe	0.5	1	f
3	sun	Doe	19	19.5	f
3	mon	Doe	8	8.5	f
3	mon	Doe	15	15.5	f
3	wed	Doe	2.5	3	f
3	wed	Doe	17.5	18	f
3	fri	Doe	14	14.5	f
3	fri	Doe	18.5	19	f
3	fri	Doe	22.5	23	f
3	wed	Doe	11.5	12	f
3	fri	Doe	10	10.5	f
3	wed	Doe	8	8.5	f
3	sun	Moffitt3	14	14.5	f
4	sun	Doe	3	3.5	f
4	sun	Doe	7.5	8	f
4	sun	Doe	12.5	13	f
4	sun	Doe	18.5	19	f
4	mon	Doe	2.5	3	f
4	mon	Doe	8	8.5	f
4	wed	Doe	16	16.5	f
4	wed	Doe	14	14.5	f
4	fri	Doe	1	1.5	f
4	fri	Doe	4	4.5	f
4	sun	Doe	15.5	16	f
4	wed	Doe	9.5	10	f
4	wed	Moffitt3	2	2.5	f
4	fri	Moffitt3	9.5	10	f
1	thu	Doe	15.5	16	f
1	mon	Doe	16.5	17	f
1	wed	Doe	1	1.5	f
1	sat	Doe	3.5	4	f
1	sat	Doe	8.5	9	f
1	sat	Doe	13.5	14	f
1	sun	Moffitt3	15	15.5	f
1	sun	Moffitt3	16	16.5	f
1	wed	Moffitt3	14.5	15	f
1	fri	Moffitt3	12	12.5	f
1	sun	Moffitt3	8.5	9	f
1	fri	Moffitt3	2	2.5	f
2	sat	Doe	1.5	2	f
2	sat	Doe	14	14.5	f
2	sat	Doe	18	18.5	f
2	tue	Doe	2.5	3	f
2	fri	Doe	14	14.5	f
2	fri	Doe	19	19.5	f
2	sat	Doe	10.5	11	f
2	fri	Doe	13.5	14	f
2	fri	Doe	8	8.5	f
2	wed	Moffitt3	3	3.5	f
2	fri	Moffitt3	3	3.5	f
2	fri	Moffitt3	6	6.5	f
2	sun	Moffitt3	9	9.5	f
2	wed	Moffitt3	9.5	10	f
2	fri	Moffitt3	7	7.5	f
3	sun	Doe	6	6.5	f
3	mon	Doe	4.5	5	f
3	mon	Doe	22.5	23	f
3	fri	Doe	2	2.5	f
3	sun	Doe	0	0.5	f
3	sun	Doe	10.5	11	f
3	sun	Doe	20.5	21	f
3	sun	Doe	17	17.5	f
3	mon	Doe	10.5	11	f
3	mon	Doe	12	12.5	f
3	wed	Doe	16	16.5	f
3	wed	Doe	21	21.5	f
3	fri	Doe	18	18.5	f
3	fri	Doe	22	22.5	f
3	wed	Doe	11	11.5	f
3	fri	Doe	10.5	11	f
3	wed	Doe	8.5	9	f
3	sun	Moffitt3	15.5	16	f
4	sun	Doe	5	5.5	f
4	sun	Doe	10.5	11	f
4	sun	Doe	22	22.5	f
4	mon	Doe	5	5.5	f
4	mon	Doe	7.5	8	f
4	wed	Doe	19	19.5	f
4	wed	Doe	13	13.5	f
4	wed	Doe	11	11.5	f
4	fri	Doe	5	5.5	f
4	wed	Doe	7	7.5	f
4	wed	Moffitt3	3.5	4	f
4	fri	Moffitt3	11	11.5	f
1	sun	Doe	0	0.5	f
1	mon	Doe	17	17.5	f
1	wed	Doe	2	2.5	f
1	sat	Doe	3	3.5	f
1	sat	Doe	9	9.5	f
1	sun	Moffitt3	10.5	11	f
1	sun	Moffitt3	14.5	15	f
1	mon	Moffitt3	8	8.5	f
1	mon	Moffitt3	12	12.5	f
1	wed	Moffitt3	11	11.5	f
1	fri	Moffitt3	10	10.5	f
1	wed	Moffitt3	6	6.5	f
1	fri	Moffitt3	4	4.5	f
2	sat	Doe	2.5	3	f
2	sat	Doe	5.5	6	f
2	sat	Doe	17.5	18	f
2	tue	Doe	2	2.5	f
2	tue	Doe	6	6.5	f
2	fri	Doe	17.5	18	f
2	sat	Doe	11	11.5	f
2	fri	Doe	11.5	12	f
2	mon	Moffitt3	3.5	4	f
2	wed	Moffitt3	4.5	5	f
2	fri	Moffitt3	1.5	2	f
2	fri	Moffitt3	5.5	6	f
2	sun	Doe	16.5	17	f
2	wed	Moffitt3	10	10.5	f
3	sun	Doe	2	2.5	f
3	mon	Doe	1	1.5	f
3	mon	Doe	20.5	21	f
3	mon	Doe	18	18.5	f
3	fri	Doe	4	4.5	f
3	sun	Doe	8	8.5	f
3	sun	Doe	20	20.5	f
3	sun	Doe	18	18.5	f
3	mon	Doe	11	11.5	f
3	mon	Doe	12.5	13	f
3	wed	Doe	3	3.5	f
3	wed	Doe	18	18.5	f
3	fri	Doe	14.5	15	f
3	fri	Doe	19	19.5	f
3	wed	Doe	14	14.5	f
3	fri	Doe	12.5	13	f
3	wed	Doe	7.5	8	f
3	fri	Doe	7.5	8	f
4	sun	Doe	2	2.5	f
4	sun	Doe	4.5	5	f
4	sun	Doe	9.5	10	f
4	sun	Doe	18	18.5	f
4	mon	Doe	4	4.5	f
4	mon	Doe	6.5	7	f
4	mon	Doe	11.5	12	f
4	wed	Doe	19.5	20	f
4	wed	Doe	21.5	22	f
4	wed	Doe	11.5	12	f
4	fri	Doe	3.5	4	f
4	sun	Doe	15	15.5	f
4	wed	Doe	8.5	9	f
4	wed	Moffitt3	4.5	5	f
4	fri	Moffitt3	10.5	11	f
1	sun	Doe	0.5	1	f
1	mon	Doe	16	16.5	f
1	wed	Doe	1.5	2	f
1	wed	Doe	5	5.5	f
1	sat	Doe	5	5.5	f
1	sat	Doe	9.5	10	f
1	sun	Moffitt3	10	10.5	f
1	sun	Moffitt3	15.5	16	f
1	mon	Moffitt3	8.5	9	f
1	mon	Moffitt3	12.5	13	f
1	wed	Moffitt3	12	12.5	f
1	fri	Moffitt3	13.5	14	f
1	fri	Moffitt3	9	9.5	f
1	wed	Moffitt3	7	7.5	f
1	fri	Moffitt3	2.5	3	f
2	sat	Doe	1	1.5	f
2	sat	Doe	14.5	15	f
2	sat	Doe	20	20.5	f
2	tue	Doe	3.5	4	f
2	fri	Doe	15	15.5	f
2	fri	Doe	18.5	19	f
2	sat	Doe	8	8.5	f
2	sat	Doe	13	13.5	f
2	fri	Doe	9.5	10	f
2	sun	Doe	13	13.5	f
2	sun	Moffitt3	8	8.5	f
2	wed	Moffitt3	11	11.5	f
3	sun	Doe	2.5	3	f
3	mon	Doe	0.5	1	f
3	mon	Doe	2.5	3	f
3	mon	Doe	21	21.5	f
3	fri	Doe	0.5	1	f
3	fri	Doe	5.5	6	f
3	sun	Doe	12	12.5	f
3	sun	Doe	17.5	18	f
3	mon	Doe	8.5	9	f
3	mon	Doe	14.5	15	f
3	wed	Doe	1.5	2	f
3	wed	Doe	5	5.5	f
3	wed	Doe	20	20.5	f
3	fri	Doe	16	16.5	f
3	wed	Doe	15	15.5	f
3	fri	Doe	13.5	14	f
3	fri	Doe	9	9.5	f
3	fri	Doe	6	6.5	f
3	sun	Moffitt3	16.5	17	f
4	sun	Doe	4	4.5	f
4	sun	Doe	8.5	9	f
4	sun	Doe	20	20.5	f
4	sun	Doe	17.5	18	f
4	mon	Doe	2	2.5	f
4	mon	Doe	8.5	9	f
4	mon	Doe	12	12.5	f
4	wed	Doe	20	20.5	f
4	wed	Doe	15	15.5	f
4	wed	Doe	12	12.5	f
4	fri	Doe	4.5	5	f
4	sun	Doe	16.5	17	f
4	wed	Moffitt3	1.5	2	f
4	fri	Moffitt3	8	8.5	f
1	mon	Doe	13	13.5	f
1	mon	Doe	18	18.5	f
1	wed	Doe	3	3.5	f
1	sat	Doe	4.5	5	f
1	sat	Doe	10	10.5	f
1	sun	Moffitt3	12.5	13	f
1	sun	Moffitt3	19	19.5	f
1	mon	Moffitt3	11	11.5	f
1	wed	Moffitt3	15.5	16	f
1	fri	Moffitt3	11.5	12	f
1	sun	Moffitt3	9	9.5	f
1	wed	Moffitt3	9.5	10	f
1	fri	Moffitt3	6	6.5	f
2	sat	Doe	3.5	4	f
2	sat	Doe	15	15.5	f
2	sat	Doe	20.5	21	f
2	tue	Doe	4	4.5	f
2	fri	Doe	14.5	15	f
2	fri	Doe	20.5	21	f
2	sat	Doe	10	10.5	f
2	fri	Doe	12.5	13	f
2	wed	Moffitt3	1.5	2	f
2	wed	Moffitt3	5.5	6	f
2	fri	Moffitt3	3.5	4	f
2	sun	Doe	14.5	15	f
2	wed	Moffitt3	7.5	8	f
2	wed	Moffitt3	11.5	12	f
3	sun	Doe	3	3.5	f
3	mon	Doe	0	0.5	f
3	mon	Doe	17	17.5	f
3	fri	Doe	3	3.5	f
3	sun	Doe	7.5	8	f
3	sun	Doe	10	10.5	f
3	sun	Doe	22.5	23	f
3	mon	Doe	7	7.5	f
3	mon	Doe	13.5	14	f
3	mon	Doe	16.5	17	f
3	wed	Doe	4.5	5	f
3	wed	Doe	19	19.5	f
3	wed	Doe	22.5	23	f
3	fri	Doe	17.5	18	f
3	wed	Doe	13	13.5	f
3	wed	Doe	10.5	11	f
3	wed	Doe	6	6.5	f
3	sun	Moffitt3	14.5	15	f
4	sun	Doe	13	13.5	f
4	sun	Doe	19.5	20	f
4	mon	Doe	3	3.5	f
4	mon	Doe	10.5	11	f
4	mon	Doe	12.5	13	f
4	wed	Doe	22	22.5	f
4	wed	Doe	12.5	13	f
4	fri	Doe	3	3.5	f
4	sun	Doe	14.5	15	f
4	wed	Doe	6	6.5	f
4	fri	Doe	7.5	8	f
4	fri	Moffitt3	8.5	9	f
4	fri	Moffitt3	12.5	13	f
1	mon	Doe	13.5	14	f
1	mon	Doe	19	19.5	f
1	wed	Doe	4	4.5	f
1	sat	Doe	5.5	6	f
1	sat	Doe	11.5	12	f
1	sun	Moffitt3	11	11.5	f
1	sun	Moffitt3	17.5	18	f
1	mon	Moffitt3	9.5	10	f
1	wed	Moffitt3	13.5	14	f
1	wed	Moffitt3	10	10.5	f
1	fri	Moffitt3	8.5	9	f
1	wed	Moffitt3	8	8.5	f
1	fri	Moffitt3	4.5	5	f
2	sat	Doe	2	2.5	f
2	sat	Doe	6	6.5	f
2	sat	Doe	19	19.5	f
2	tue	Doe	4.5	5	f
2	fri	Doe	15.5	16	f
2	fri	Doe	19.5	20	f
2	sat	Doe	9	9.5	f
2	sat	Doe	13.5	14	f
2	fri	Doe	10	10.5	f
2	wed	Moffitt3	1	1.5	f
2	wed	Moffitt3	4	4.5	f
2	fri	Moffitt3	2.5	3	f
2	sun	Doe	13.5	14	f
2	wed	Moffitt3	7	7.5	f
2	wed	Moffitt3	12	12.5	f
3	sun	Doe	3.5	4	f
3	sun	Doe	6.5	7	f
3	mon	Doe	3.5	4	f
3	mon	Doe	22	22.5	f
3	fri	Doe	1	1.5	f
3	fri	Doe	5	5.5	f
3	sun	Doe	9.5	10	f
3	sun	Doe	22	22.5	f
3	mon	Doe	9	9.5	f
3	mon	Doe	15.5	16	f
3	wed	Doe	1	1.5	f
3	wed	Doe	5.5	6	f
3	wed	Doe	20.5	21	f
3	fri	Doe	16.5	17	f
3	fri	Doe	20.5	21	f
3	wed	Doe	14.5	15	f
3	fri	Doe	12	12.5	f
3	fri	Doe	9.5	10	f
3	wed	Doe	9	9.5	f
3	sun	Moffitt3	13.5	14	f
4	sun	Doe	2.5	3	f
4	sun	Doe	8	8.5	f
4	sun	Doe	11.5	12	f
4	sun	Doe	19	19.5	f
4	mon	Doe	1	1.5	f
4	mon	Doe	6	6.5	f
4	mon	Doe	11	11.5	f
4	wed	Doe	18.5	19	f
4	wed	Doe	13.5	14	f
4	fri	Doe	1.5	2	f
4	sun	Doe	14	14.5	f
4	wed	Doe	9	9.5	f
4	wed	Moffitt3	5	5.5	f
1	mon	Doe	14	14.5	f
1	mon	Doe	18.5	19	f
1	wed	Doe	3.5	4	f
1	sat	Doe	4	4.5	f
1	sat	Doe	7	7.5	f
1	sat	Doe	12	12.5	f
1	sun	Moffitt3	13	13.5	f
1	sun	Moffitt3	18.5	19	f
1	mon	Moffitt3	10.5	11	f
1	wed	Moffitt3	15	15.5	f
1	fri	Moffitt3	12.5	13	f
1	sun	Moffitt3	8	8.5	f
1	wed	Moffitt3	8.5	9	f
1	fri	Moffitt3	5.5	6	f
2	sat	Doe	4	4.5	f
2	sat	Doe	16.5	17	f
2	sat	Doe	22	22.5	f
2	thu	Doe	3.5	4	f
2	fri	Doe	17	17.5	f
2	fri	Doe	21.5	22	f
2	sat	Doe	8.5	9	f
2	sat	Doe	12.5	13	f
2	fri	Doe	9	9.5	f
2	mon	Moffitt3	5.5	6	f
2	wed	Moffitt3	6	6.5	f
2	fri	Moffitt3	4.5	5	f
2	sun	Doe	15	15.5	f
2	wed	Moffitt3	8	8.5	f
2	fri	Moffitt3	7.5	8	f
3	mon	Doe	1.5	2	f
3	mon	Doe	20	20.5	f
3	mon	Doe	19	19.5	f
3	fri	Doe	3.5	4	f
3	sun	Doe	8.5	9	f
3	sun	Doe	12.5	13	f
3	sun	Doe	18.5	19	f
3	mon	Doe	7.5	8	f
3	mon	Doe	13	13.5	f
3	wed	Doe	0.5	1	f
3	wed	Doe	16.5	17	f
3	wed	Doe	22	22.5	f
3	fri	Doe	17	17.5	f
3	fri	Doe	20	20.5	f
3	wed	Doe	13.5	14	f
3	wed	Doe	10	10.5	f
3	fri	Doe	8	8.5	f
3	wed	Doe	9.5	10	f
3	sun	Moffitt3	16	16.5	f
4	sun	Doe	5.5	6	f
4	sun	Doe	10	10.5	f
4	sun	Doe	21.5	22	f
4	mon	Doe	3.5	4	f
4	mon	Doe	10	10.5	f
4	wed	Doe	17	17.5	f
4	wed	Doe	22.5	23	f
4	wed	Doe	10.5	11	f
4	fri	Doe	5.5	6	f
4	wed	Doe	6.5	7	f
4	wed	Moffitt3	2.5	3	f
4	fri	Moffitt3	10	10.5	f
1	mon	Doe	15	15.5	f
1	wed	Doe	0	0.5	f
1	wed	Doe	5.5	6	f
1	sat	Doe	6.5	7	f
1	sat	Doe	10.5	11	f
1	sun	Moffitt3	12	12.5	f
1	sun	Moffitt3	18	18.5	f
1	mon	Moffitt3	11.5	12	f
1	wed	Moffitt3	11.5	12	f
1	fri	Moffitt3	9.5	10	f
1	wed	Moffitt3	7.5	8	f
1	fri	Moffitt3	5	5.5	f
2	sat	Doe	3	3.5	f
2	sat	Doe	15.5	16	f
2	sat	Doe	21	21.5	f
2	tue	Doe	5	5.5	f
2	fri	Doe	16	16.5	f
2	fri	Doe	21	21.5	f
2	sat	Doe	9.5	10	f
2	fri	Doe	10.5	11	f
2	wed	Moffitt3	2	2.5	f
2	wed	Moffitt3	6.5	7	f
2	fri	Moffitt3	5	5.5	f
2	sun	Doe	16	16.5	f
2	wed	Moffitt3	8.5	9	f
3	sun	Doe	1	1.5	f
3	sun	Doe	5.5	6	f
3	mon	Doe	3	3.5	f
3	mon	Doe	19.5	20	f
3	fri	Doe	0	0.5	f
3	sun	Doe	7	7.5	f
3	sun	Doe	11	11.5	f
3	sun	Doe	21.5	22	f
3	mon	Doe	6.5	7	f
3	mon	Doe	11.5	12	f
3	wed	Doe	0	0.5	f
3	wed	Doe	4	4.5	f
3	wed	Doe	19.5	20	f
3	fri	Doe	15.5	16	f
3	fri	Doe	21.5	22	f
3	wed	Doe	15.5	16	f
3	fri	Doe	11.5	12	f
3	wed	Doe	7	7.5	f
3	sun	Moffitt3	13	13.5	f
4	sun	Doe	3.5	4	f
4	sun	Doe	7	7.5	f
4	sun	Doe	9	9.5	f
4	sun	Doe	21	21.5	f
4	mon	Doe	4.5	5	f
4	mon	Doe	9.5	10	f
4	wed	Doe	17.5	18	f
4	wed	Doe	21	21.5	f
4	wed	Doe	15.5	16	f
4	fri	Doe	2.5	3	f
4	fri	Doe	6	6.5	f
4	wed	Doe	8	8.5	f
4	wed	Moffitt3	4	4.5	f
4	fri	Moffitt3	11.5	12	f
1	mon	Doe	15.5	16	f
1	wed	Doe	0.5	1	f
1	sat	Doe	2	2.5	f
1	sat	Doe	8	8.5	f
1	sat	Doe	13	13.5	f
1	sun	Moffitt3	14	14.5	f
1	sun	Moffitt3	16.5	17	f
1	wed	Moffitt3	14	14.5	f
1	fri	Moffitt3	13	13.5	f
1	sun	Moffitt3	9.5	10	f
1	fri	Moffitt3	3.5	4	f
1	fri	Moffitt3	7.5	8	f
2	sat	Doe	4.5	5	f
2	sat	Doe	17	17.5	f
2	sat	Doe	21.5	22	f
2	tue	Doe	5.5	6	f
2	fri	Doe	20	20.5	f
2	fri	Doe	22.5	23	f
2	sat	Doe	11.5	12	f
2	fri	Doe	11	11.5	f
2	mon	Moffitt3	2.5	3	f
2	wed	Moffitt3	2.5	3	f
2	wed	Moffitt3	5	5.5	f
2	fri	Moffitt3	4	4.5	f
2	sun	Doe	15.5	16	f
2	wed	Moffitt3	9	9.5	f
3	sun	Doe	1.5	2	f
3	sun	Doe	4.5	5	f
3	mon	Doe	2	2.5	f
3	mon	Doe	5.5	6	f
3	mon	Doe	18.5	19	f
3	fri	Doe	2.5	3	f
3	sun	Doe	9	9.5	f
3	sun	Doe	21	21.5	f
3	mon	Doe	6	6.5	f
3	mon	Doe	10	10.5	f
3	mon	Doe	14	14.5	f
3	wed	Doe	2	2.5	f
3	wed	Doe	18.5	19	f
3	fri	Doe	15	15.5	f
3	fri	Doe	19.5	20	f
3	wed	Doe	12.5	13	f
3	fri	Doe	13	13.5	f
3	fri	Doe	8.5	9	f
3	fri	Doe	6.5	7	f
4	sun	Doe	1.5	2	f
4	sun	Doe	6	6.5	f
4	sun	Doe	11	11.5	f
4	sun	Doe	22.5	23	f
4	mon	Doe	1.5	2	f
4	mon	Doe	9	9.5	f
4	wed	Doe	18	18.5	f
4	wed	Doe	14.5	15	f
4	wed	Doe	10	10.5	f
4	sun	Doe	13.5	14	f
4	wed	Doe	7.5	8	f
4	wed	Moffitt3	3	3.5	f
4	fri	Moffitt3	9	9.5	f
4	fri	Moffitt3	12	12.5	f
1	mon	Doe	17.5	18	f
1	wed	Doe	2.5	3	f
1	sat	Doe	2.5	3	f
1	sat	Doe	7.5	8	f
1	sat	Doe	12.5	13	f
1	sun	Moffitt3	13.5	14	f
1	sun	Moffitt3	19.5	20	f
1	mon	Moffitt3	10	10.5	f
1	wed	Moffitt3	12.5	13	f
1	fri	Moffitt3	11	11.5	f
1	fri	Moffitt3	8	8.5	f
1	wed	Moffitt3	9	9.5	f
1	fri	Moffitt3	6.5	7	f
2	sat	Doe	6.5	7	f
2	sat	Doe	18.5	19	f
2	tue	Doe	3	3.5	f
2	fri	Doe	16.5	17	f
2	fri	Doe	22	22.5	f
2	sat	Doe	7.5	8	f
2	fri	Doe	13	13.5	f
2	fri	Doe	8.5	9	f
2	mon	Moffitt3	5	5.5	f
2	fri	Moffitt3	1	1.5	f
2	sun	Doe	14	14.5	f
2	sun	Moffitt3	9.5	10	f
2	wed	Moffitt3	10.5	11	f
3	sun	Doe	4	4.5	f
3	mon	Doe	5	5.5	f
3	mon	Doe	17.5	18	f
3	fri	Doe	4.5	5	f
3	sun	Doe	11.5	12	f
3	sun	Doe	19.5	20	f
3	mon	Doe	9.5	10	f
3	mon	Doe	16	16.5	f
3	wed	Doe	3.5	4	f
3	wed	Doe	17	17.5	f
3	wed	Doe	21.5	22	f
3	fri	Doe	21	21.5	f
3	wed	Doe	12	12.5	f
3	fri	Doe	11	11.5	f
3	wed	Doe	6.5	7	f
3	fri	Doe	7	7.5	f
3	sun	Moffitt3	15	15.5	f
4	sun	Doe	6.5	7	f
4	sun	Doe	12	12.5	f
4	sun	Doe	20.5	21	f
4	sun	Doe	17	17.5	f
4	mon	Doe	5.5	6	f
4	mon	Doe	7	7.5	f
4	wed	Doe	16.5	17	f
4	wed	Doe	20.5	21	f
4	fri	Doe	2	2.5	f
4	fri	Doe	6.5	7	f
4	sun	Doe	16	16.5	f
4	fri	Doe	7	7.5	f
4	wed	Moffitt3	5.5	6	f
\.


--
-- Data for Name: shifts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.shifts (shift_id, sle_id, location, start_time, end_time, cover_requested) FROM stdin;
757	2	Doe	2020-05-17 00:00:00	2020-05-17 14:00:00	true
766	4	Doe	2020-05-18 01:00:00	2020-05-18 08:00:00	true
763	3	Doe	2020-05-18 00:00:00	2020-05-18 23:00:00	true
758	3	Doe	2020-05-17 00:00:00	2020-05-17 23:00:00	\N
759	3	Moffitt3	2020-05-17 13:00:00	2020-05-17 17:00:00	\N
760	1	Moffitt3	2020-05-18 08:00:00	2020-05-18 20:00:00	\N
761	3	Doe	2020-05-17 17:00:00	2020-05-17 23:00:00	\N
762	2	Moffitt3	2020-05-18 05:00:00	2020-05-18 13:00:00	\N
764	4	Doe	2020-05-17 01:30:00	2020-05-17 23:00:00	\N
765	1	Doe	2020-05-18 13:00:00	2020-05-18 20:00:00	\N
767	1	Doe	2020-05-19 00:00:00	2020-05-19 06:00:00	\N
768	2	Doe	2020-05-19 02:00:00	2020-05-19 06:30:00	\N
769	1	Doe	2020-05-20 00:00:00	2020-05-20 06:00:00	\N
770	1	Doe	2020-05-20 02:00:00	2020-05-20 16:00:00	\N
771	1	Moffitt3	2020-05-20 06:00:00	2020-05-20 14:00:00	\N
772	1	Moffitt3	2020-05-20 08:00:00	2020-05-20 16:00:00	\N
773	2	Moffitt3	2020-05-20 01:00:00	2020-05-20 04:00:00	\N
774	2	Moffitt3	2020-05-20 02:30:00	2020-05-20 10:00:00	\N
775	3	Doe	2020-05-20 00:00:00	2020-05-20 13:00:00	\N
776	4	Moffitt3	2020-05-20 01:30:00	2020-05-20 06:00:00	\N
777	4	Doe	2020-05-20 06:00:00	2020-05-20 23:00:00	\N
778	1	Doe	2020-05-21 00:00:00	2020-05-21 01:00:00	\N
779	2	Doe	2020-05-21 03:00:00	2020-05-21 17:00:00	\N
780	1	Moffitt3	2020-05-22 02:00:00	2020-05-22 13:00:00	\N
781	2	Moffitt3	2020-05-22 01:00:00	2020-05-22 06:00:00	\N
782	3	Doe	2020-05-22 00:00:00	2020-05-22 23:00:00	\N
783	4	Doe	2020-05-22 01:00:00	2020-05-22 13:00:00	\N
784	4	Moffitt3	2020-05-22 08:00:00	2020-05-22 13:00:00	\N
785	1	Doe	2020-05-23 06:30:00	2020-05-23 20:00:00	\N
786	2	Doe	2020-05-23 01:00:00	2020-05-23 04:00:00	\N
787	2	Doe	2020-05-23 08:00:00	2020-05-23 23:00:00	\N
788	2	Doe	2020-05-23 13:00:00	2020-05-23 23:00:00	\N
\.


--
-- Data for Name: sle; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sle (id, name, training_level_doe, training_level_moffitt3, email, password, training_level_moffitt4, salt) FROM stdin;
1	brian	3	3	bdeleonardis@berkeley.edu	587ae6bbccfe600668c83b5b0e2109354f09e6e	2	4XyKi897FJvpMKDlTmb/+eEXqcpaB2XOpl+BPuI
2	bianca	1	1	biancalee@berkeley.edu	2f3bd5e430a9b169f317dcaded7e356ea1b94f1	2	ztLw04EikUlqe3yq1cjcs3yeEnwdy6gHb2HxLr9
3	Sahil	3	2	sahil@berkeley.edu	1ca61fa86d2ea01c80892f6eb9ba32fb9e12673	2	k/1oy6EwIaBgJPY5zCl0ClY4s+infCFqsmhGc3F
4	Kat	3	2	Kat@berkeley.edu	967c640e556aa61ac6cee93a7e58cc1daba5953	2	BuG30qdZkKuPxAV1Y5JTiU1WCZCw/aElqrUSw97
5	Kerry	2	2	Kerry@berkeley.edu	072b65cd3a42d9958dfd34e41ca36ddfcc9f38a	2	jNllam950oZis4rgSOXzT+WS1wcqhTKfu6aT0z9
\.


--
-- Data for Name: supervisor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.supervisor (id, name, email, password, salt) FROM stdin;
2	joey	joeyjoey@berkeley.edu	joeyiscool	\N
1	nancy	nancy@berkeley.edu	b2b29e2917fdec7abf268d49e3b1f2966323e8b	D/uU9Y6JZguqXo3C+GL8UtH1WNJdRM9zsLatcyb
\.


--
-- Name: availability_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.availability_availability_id_seq', 1585, true);


--
-- Name: coverrequests_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.coverrequests_request_id_seq', 21, true);


--
-- Name: shifts_shift_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shifts_shift_id_seq', 788, true);


--
-- Name: sle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sle_id_seq', 6, true);


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

