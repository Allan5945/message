/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : message

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 10/09/2020 15:30:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for apply_join
-- ----------------------------
DROP TABLE IF EXISTS `apply_join`;
CREATE TABLE `apply_join`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` bigint(0) NOT NULL COMMENT '申请人id',
  `apply_id` bigint(0) DEFAULT NULL COMMENT '被申请人id',
  `apply_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '申请时间',
  `agreed_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '同意时间',
  `state` int(0) DEFAULT 2 COMMENT '状态, 0、同意，1、拒绝，2、未处理，3、忽略，4、关闭',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 95 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apply_join
-- ----------------------------
INSERT INTO `apply_join` VALUES (94, 23, 24, '2020-09-10 15:15:07', NULL, 0);

-- ----------------------------
-- Table structure for apply_join_group
-- ----------------------------
DROP TABLE IF EXISTS `apply_join_group`;
CREATE TABLE `apply_join_group`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '申请表id',
  `user_id` bigint(0) NOT NULL COMMENT '申请人id',
  `group_id` bigint(0) NOT NULL COMMENT '群id',
  `apply_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '申请加群时间',
  `state` int(0) DEFAULT 2 COMMENT '状态，0，批准，1，拒绝，2，未处理，3，忽略',
  `is_push` int(0) DEFAULT 1 COMMENT '是否推送过，0，推送成功，1，推送失败',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '发送消息id',
  `mes` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '加密消息内容',
  `send_userid` bigint(0) DEFAULT NULL COMMENT '发送用户的id',
  `receive_userid` bigint(0) DEFAULT NULL COMMENT '接收用户id',
  `create_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '创建消息时间',
  `receive_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '接收消息时间',
  `view_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '查看消息时间',
  `mes_type` int(0) DEFAULT NULL COMMENT '消息类型， 0、文字，1、语音，2、其它',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 434 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (427, '121', 24, 23, '2020-09-09 14:01:58', NULL, '2020-09-09 14:02:18', 0);
INSERT INTO `chat` VALUES (428, '1212', 23, 24, '2020-09-09 14:02:21', NULL, '2020-09-09 14:13:28', 0);
INSERT INTO `chat` VALUES (429, '12', 24, 23, '2020-09-09 14:13:38', NULL, '2020-09-09 14:20:38', 0);
INSERT INTO `chat` VALUES (430, '121', 24, 23, '2020-09-09 14:14:50', NULL, '2020-09-09 14:20:38', 0);
INSERT INTO `chat` VALUES (431, '22', 23, 24, '2020-09-09 14:48:47', NULL, '2020-09-10 15:19:45', 0);
INSERT INTO `chat` VALUES (432, '222', 24, 23, '2020-09-10 15:19:48', NULL, '2020-09-10 15:19:51', 0);
INSERT INTO `chat` VALUES (433, '/voice/6028eda0-f336-11ea-8621-3f8f44905a43.mp3', 23, 24, '2020-09-10 15:22:25', NULL, NULL, 1);

-- ----------------------------
-- Table structure for group_chat
-- ----------------------------
DROP TABLE IF EXISTS `group_chat`;
CREATE TABLE `group_chat`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '消息id',
  `mes` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '内容',
  `send_userid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '发送用户的id',
  `receive_groupid` bigint(0) DEFAULT NULL COMMENT '接收群id',
  `create_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '创建消息时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 168 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of group_chat
-- ----------------------------
INSERT INTO `group_chat` VALUES (1, 'nihao溜溜溜', '1', 1, 'Mon Aug 03 2020');
INSERT INTO `group_chat` VALUES (2, '阿萨', '1', 7, '2020-08-06 13:12:01');
INSERT INTO `group_chat` VALUES (3, '阿萨', '1', 7, '2020-08-06 13:22:18');
INSERT INTO `group_chat` VALUES (4, '11', '1', 4, '2020-08-06 13:23:27');
INSERT INTO `group_chat` VALUES (5, '11', '1', 4, '2020-08-06 13:23:27');
INSERT INTO `group_chat` VALUES (6, '撒', '1', 4, '2020-08-06 13:30:10');
INSERT INTO `group_chat` VALUES (7, '撒', '1', 4, '2020-08-06 13:30:29');
INSERT INTO `group_chat` VALUES (8, '撒', '1', 4, '2020-08-06 13:30:52');
INSERT INTO `group_chat` VALUES (9, '撒', '1', 4, '2020-08-06 13:30:57');
INSERT INTO `group_chat` VALUES (10, '撒', '1', 4, '2020-08-06 13:31:03');
INSERT INTO `group_chat` VALUES (11, '撒', '1', 4, '2020-08-06 13:31:19');
INSERT INTO `group_chat` VALUES (12, '1212', '1', 4, '2020-08-06 13:32:17');
INSERT INTO `group_chat` VALUES (13, '1212', '1', 4, '2020-08-06 13:33:25');
INSERT INTO `group_chat` VALUES (14, '1212', '1', 4, '2020-08-06 13:39:00');
INSERT INTO `group_chat` VALUES (15, '1212', '1', 4, '2020-08-06 13:39:00');
INSERT INTO `group_chat` VALUES (16, '1212', '1', 4, '2020-08-06 13:53:25');
INSERT INTO `group_chat` VALUES (17, '1212', '1', 4, '2020-08-06 13:53:25');
INSERT INTO `group_chat` VALUES (18, '1212', '1', 4, '2020-08-06 13:54:53');
INSERT INTO `group_chat` VALUES (19, '1212', '1', 4, '2020-08-06 13:54:53');
INSERT INTO `group_chat` VALUES (20, '1212', '1', 4, '2020-08-06 13:55:13');
INSERT INTO `group_chat` VALUES (21, '1212', '1', 4, '2020-08-06 13:55:13');
INSERT INTO `group_chat` VALUES (22, '1212', '1', 4, '2020-08-06 13:56:10');
INSERT INTO `group_chat` VALUES (23, '1212', '1', 4, '2020-08-06 13:56:10');
INSERT INTO `group_chat` VALUES (24, '1212', '1', 4, '2020-08-06 13:56:16');
INSERT INTO `group_chat` VALUES (25, '1212', '1', 4, '2020-08-06 13:56:16');
INSERT INTO `group_chat` VALUES (26, '1212', '1', 4, '2020-08-06 13:56:25');
INSERT INTO `group_chat` VALUES (27, '1212', '1', 4, '2020-08-06 13:56:25');
INSERT INTO `group_chat` VALUES (28, '121', '1', 4, '2020-08-06 13:56:44');
INSERT INTO `group_chat` VALUES (29, '121', '1', 4, '2020-08-06 13:56:44');
INSERT INTO `group_chat` VALUES (30, '121', '1', 4, '2020-08-06 13:57:05');
INSERT INTO `group_chat` VALUES (31, '121', '1', 4, '2020-08-06 13:57:05');
INSERT INTO `group_chat` VALUES (32, '121', '1', 4, '2020-08-06 13:58:53');
INSERT INTO `group_chat` VALUES (33, '121', '1', 4, '2020-08-06 13:58:53');
INSERT INTO `group_chat` VALUES (34, '121', '1', 4, '2020-08-06 13:59:05');
INSERT INTO `group_chat` VALUES (35, '121', '1', 4, '2020-08-06 13:59:05');
INSERT INTO `group_chat` VALUES (36, '1212', '1', 4, '2020-08-06 14:01:48');
INSERT INTO `group_chat` VALUES (37, '1212', '1', 4, '2020-08-06 14:01:48');
INSERT INTO `group_chat` VALUES (38, '1212', '1', 4, '2020-08-06 14:02:19');
INSERT INTO `group_chat` VALUES (39, '1212', '1', 4, '2020-08-06 14:02:19');
INSERT INTO `group_chat` VALUES (40, '1212', '1', 4, '2020-08-06 14:02:32');
INSERT INTO `group_chat` VALUES (41, '1212', '1', 4, '2020-08-06 14:02:32');
INSERT INTO `group_chat` VALUES (42, '1212', '1', 4, '2020-08-06 14:05:47');
INSERT INTO `group_chat` VALUES (43, '1212', '1', 4, '2020-08-06 14:05:47');
INSERT INTO `group_chat` VALUES (44, '1212', '1', 4, '2020-08-06 14:05:54');
INSERT INTO `group_chat` VALUES (45, '1212', '1', 4, '2020-08-06 14:05:54');
INSERT INTO `group_chat` VALUES (46, '飒飒', '1', 4, '2020-08-06 14:07:54');
INSERT INTO `group_chat` VALUES (47, '飒飒', '1', 4, '2020-08-06 14:07:54');
INSERT INTO `group_chat` VALUES (48, '飒飒', '1', 4, '2020-08-06 14:07:54');
INSERT INTO `group_chat` VALUES (49, '飒飒', '1', 4, '2020-08-06 14:07:54');
INSERT INTO `group_chat` VALUES (50, '12', '1', 4, '2020-08-06 14:08:34');
INSERT INTO `group_chat` VALUES (51, '12', '1', 4, '2020-08-06 14:08:34');
INSERT INTO `group_chat` VALUES (52, '12', '1', 4, '2020-08-06 14:08:34');
INSERT INTO `group_chat` VALUES (53, '12', '1', 4, '2020-08-06 14:08:34');
INSERT INTO `group_chat` VALUES (54, '12', '1', 4, '2020-08-06 14:08:34');
INSERT INTO `group_chat` VALUES (55, '12', '1', 4, '2020-08-06 14:08:34');
INSERT INTO `group_chat` VALUES (56, '12', '1', 4, '2020-08-06 14:08:35');
INSERT INTO `group_chat` VALUES (57, '12', '1', 4, '2020-08-06 14:08:35');
INSERT INTO `group_chat` VALUES (58, '12', '1', 4, '2020-08-06 14:08:35');
INSERT INTO `group_chat` VALUES (59, '12', '1', 4, '2020-08-06 14:08:35');
INSERT INTO `group_chat` VALUES (60, '1211111', '1', 4, '2020-08-06 14:08:37');
INSERT INTO `group_chat` VALUES (61, '1211111', '1', 4, '2020-08-06 14:08:37');
INSERT INTO `group_chat` VALUES (62, '1211111', '1', 4, '2020-08-06 14:08:38');
INSERT INTO `group_chat` VALUES (63, '1211111', '1', 4, '2020-08-06 14:08:38');
INSERT INTO `group_chat` VALUES (64, '1211111', '1', 4, '2020-08-06 14:08:38');
INSERT INTO `group_chat` VALUES (65, '1211111', '1', 4, '2020-08-06 14:08:38');
INSERT INTO `group_chat` VALUES (66, '1211111', '1', 4, '2020-08-06 14:08:38');
INSERT INTO `group_chat` VALUES (67, '1211111', '1', 4, '2020-08-06 14:08:38');
INSERT INTO `group_chat` VALUES (68, '1211111', '1', 4, '2020-08-06 14:19:24');
INSERT INTO `group_chat` VALUES (69, '1211111', '1', 4, '2020-08-06 14:19:24');
INSERT INTO `group_chat` VALUES (70, '1211111', '1', 4, '2020-08-06 14:19:25');
INSERT INTO `group_chat` VALUES (71, '1211111', '1', 4, '2020-08-06 14:19:25');
INSERT INTO `group_chat` VALUES (72, '1211111', '1', 4, '2020-08-06 14:19:33');
INSERT INTO `group_chat` VALUES (73, '1211111', '1', 4, '2020-08-06 14:19:33');
INSERT INTO `group_chat` VALUES (74, '1211111', '1', 4, '2020-08-06 14:19:34');
INSERT INTO `group_chat` VALUES (75, '1211111', '1', 4, '2020-08-06 14:19:34');
INSERT INTO `group_chat` VALUES (76, '1211111', '1', 4, '2020-08-06 14:19:34');
INSERT INTO `group_chat` VALUES (77, '1211111', '1', 4, '2020-08-06 14:19:34');
INSERT INTO `group_chat` VALUES (78, '1211111', '1', 4, '2020-08-06 14:19:34');
INSERT INTO `group_chat` VALUES (79, '1211111', '1', 4, '2020-08-06 14:19:34');
INSERT INTO `group_chat` VALUES (80, '1211111', '1', 4, '2020-08-06 14:19:34');
INSERT INTO `group_chat` VALUES (81, '1211111', '1', 4, '2020-08-06 14:19:34');
INSERT INTO `group_chat` VALUES (82, '11', '1', 4, '2020-08-06 14:19:40');
INSERT INTO `group_chat` VALUES (83, '11', '1', 4, '2020-08-06 14:19:40');
INSERT INTO `group_chat` VALUES (84, '11', '1', 4, '2020-08-06 14:19:40');
INSERT INTO `group_chat` VALUES (85, '11', '1', 4, '2020-08-06 14:19:40');
INSERT INTO `group_chat` VALUES (86, '11', '1', 4, '2020-08-06 14:19:40');
INSERT INTO `group_chat` VALUES (87, '11', '1', 4, '2020-08-06 14:19:40');
INSERT INTO `group_chat` VALUES (88, '11', '1', 4, '2020-08-06 14:19:41');
INSERT INTO `group_chat` VALUES (89, '11', '1', 4, '2020-08-06 14:19:41');
INSERT INTO `group_chat` VALUES (90, '11', '1', 4, '2020-08-06 14:19:47');
INSERT INTO `group_chat` VALUES (91, '11', '1', 4, '2020-08-06 14:19:47');
INSERT INTO `group_chat` VALUES (92, '11', '1', 4, '2020-08-06 14:19:48');
INSERT INTO `group_chat` VALUES (93, '11', '1', 4, '2020-08-06 14:19:48');
INSERT INTO `group_chat` VALUES (94, '11', '1', 4, '2020-08-06 14:19:48');
INSERT INTO `group_chat` VALUES (95, '11', '1', 4, '2020-08-06 14:19:48');
INSERT INTO `group_chat` VALUES (96, '11', '1', 4, '2020-08-06 14:19:49');
INSERT INTO `group_chat` VALUES (97, '11', '1', 4, '2020-08-06 14:19:49');
INSERT INTO `group_chat` VALUES (98, '11', '1', 4, '2020-08-06 14:19:49');
INSERT INTO `group_chat` VALUES (99, '11', '1', 4, '2020-08-06 14:19:49');
INSERT INTO `group_chat` VALUES (100, '11', '1', 4, '2020-08-06 14:19:49');
INSERT INTO `group_chat` VALUES (101, '11', '1', 4, '2020-08-06 14:19:49');
INSERT INTO `group_chat` VALUES (102, '11', '1', 4, '2020-08-06 14:19:49');
INSERT INTO `group_chat` VALUES (103, '11', '1', 4, '2020-08-06 14:19:49');
INSERT INTO `group_chat` VALUES (104, '11', '1', 4, '2020-08-06 14:19:50');
INSERT INTO `group_chat` VALUES (105, '11', '1', 4, '2020-08-06 14:19:50');
INSERT INTO `group_chat` VALUES (106, '11', '1', 4, '2020-08-06 14:20:15');
INSERT INTO `group_chat` VALUES (107, '11', '1', 4, '2020-08-06 14:20:15');
INSERT INTO `group_chat` VALUES (108, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (109, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (110, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (111, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (112, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (113, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (114, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (115, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (116, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (117, '11', '1', 4, '2020-08-06 14:20:16');
INSERT INTO `group_chat` VALUES (118, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (119, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (120, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (121, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (122, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (123, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (124, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (125, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (126, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (127, '11', '1', 4, '2020-08-06 14:20:17');
INSERT INTO `group_chat` VALUES (128, '11', '1', 4, '2020-08-06 14:20:35');
INSERT INTO `group_chat` VALUES (129, '11', '1', 4, '2020-08-06 14:20:35');
INSERT INTO `group_chat` VALUES (130, '11', '1', 4, '2020-08-06 14:20:35');
INSERT INTO `group_chat` VALUES (131, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (132, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (133, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (134, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (135, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (136, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (137, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (138, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (139, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (140, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (141, '11', '1', 4, '2020-08-06 14:20:36');
INSERT INTO `group_chat` VALUES (142, '11', '1', 4, '2020-08-06 14:20:37');
INSERT INTO `group_chat` VALUES (143, '11', '1', 4, '2020-08-06 14:20:37');
INSERT INTO `group_chat` VALUES (144, '11', '1', 4, '2020-08-06 14:20:37');
INSERT INTO `group_chat` VALUES (145, '11', '1', 4, '2020-08-06 14:20:37');
INSERT INTO `group_chat` VALUES (146, '11', '1', 4, '2020-08-06 14:20:37');
INSERT INTO `group_chat` VALUES (147, '11', '1', 4, '2020-08-06 14:20:37');
INSERT INTO `group_chat` VALUES (148, '11', '1', 4, '2020-08-06 14:20:38');
INSERT INTO `group_chat` VALUES (149, '11', '1', 4, '2020-08-06 14:20:38');
INSERT INTO `group_chat` VALUES (150, '22', '1', 4, '2020-08-07 10:17:19');
INSERT INTO `group_chat` VALUES (151, '22', '1', 4, '2020-08-07 10:17:19');
INSERT INTO `group_chat` VALUES (152, '22', '1', 4, '2020-08-07 10:40:31');
INSERT INTO `group_chat` VALUES (153, '22', '1', 4, '2020-08-07 10:40:31');
INSERT INTO `group_chat` VALUES (154, '22', '1', 4, '2020-08-07 10:40:31');
INSERT INTO `group_chat` VALUES (155, '22', '1', 4, '2020-08-07 10:40:31');
INSERT INTO `group_chat` VALUES (156, '22', '1', 4, '2020-08-07 10:40:31');
INSERT INTO `group_chat` VALUES (157, '22', '1', 4, '2020-08-07 10:40:31');
INSERT INTO `group_chat` VALUES (158, '1111', '1', 4, '2020-08-07 10:53:10');
INSERT INTO `group_chat` VALUES (159, '1111', '1', 4, '2020-08-07 10:53:10');
INSERT INTO `group_chat` VALUES (160, '122', '1', 4, '2020-08-07 10:53:51');
INSERT INTO `group_chat` VALUES (161, '122', '1', 4, '2020-08-07 10:53:51');
INSERT INTO `group_chat` VALUES (162, '11', '1', 4, '2020-08-07 10:56:10');
INSERT INTO `group_chat` VALUES (163, '11', '1', 4, '2020-08-07 10:56:10');
INSERT INTO `group_chat` VALUES (164, '12', '1', 4, '2020-08-07 11:04:08');
INSERT INTO `group_chat` VALUES (165, '12', '1', 4, '2020-08-07 11:04:08');
INSERT INTO `group_chat` VALUES (166, '1212', '1', 4, '2020-08-07 11:04:59');
INSERT INTO `group_chat` VALUES (167, '1212', '1', 4, '2020-08-07 11:04:59');

-- ----------------------------
-- Table structure for group_table
-- ----------------------------
DROP TABLE IF EXISTS `group_table`;
CREATE TABLE `group_table`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '群id',
  `group_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '群名字',
  `group_userids` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '群成员id，以,分割',
  `group_state` int(0) DEFAULT 0 COMMENT '群状态，0、关闭，1、开放',
  `group_type` int(0) DEFAULT 0 COMMENT '群类型，0、私有群，1、开放群',
  `group_having` int(0) DEFAULT NULL COMMENT '群主id',
  `group_admin` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '群管理员id, 以,分割',
  `group_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '群邀请码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of group_table
-- ----------------------------
INSERT INTO `group_table` VALUES (4, 'asasas', '1,7', 1, 1, 1, '132', 'BCGTZ4TQK');
INSERT INTO `group_table` VALUES (5, 'asasas', '1', 1, 1, 1, '132', 'BCGTZ4TQ1');
INSERT INTO `group_table` VALUES (6, 'asasas', '1', 1, 1, 1, '', 'BCGTZ4TQ2');

-- ----------------------------
-- Table structure for nearest_contact
-- ----------------------------
DROP TABLE IF EXISTS `nearest_contact`;
CREATE TABLE `nearest_contact`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '时间',
  `user_id` bigint(0) DEFAULT NULL COMMENT '用户id',
  `contact_id` bigint(0) DEFAULT NULL COMMENT '联系人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 162 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of nearest_contact
-- ----------------------------
INSERT INTO `nearest_contact` VALUES (122, '2020-09-09 14:01:56', 24, 23);
INSERT INTO `nearest_contact` VALUES (123, '2020-09-09 14:02:18', 23, 24);
INSERT INTO `nearest_contact` VALUES (124, '2020-09-09 14:02:24', 23, 24);
INSERT INTO `nearest_contact` VALUES (125, '2020-09-09 14:13:28', 24, 23);
INSERT INTO `nearest_contact` VALUES (126, '2020-09-09 14:14:04', 24, 23);
INSERT INTO `nearest_contact` VALUES (127, '2020-09-09 14:14:43', 24, 23);
INSERT INTO `nearest_contact` VALUES (128, '2020-09-09 14:20:38', 23, 24);
INSERT INTO `nearest_contact` VALUES (129, '2020-09-09 14:20:43', 23, 24);
INSERT INTO `nearest_contact` VALUES (130, '2020-09-09 14:20:53', 24, 23);
INSERT INTO `nearest_contact` VALUES (131, '2020-09-09 14:21:13', 23, 24);
INSERT INTO `nearest_contact` VALUES (132, '2020-09-09 14:21:19', 23, 24);
INSERT INTO `nearest_contact` VALUES (133, '2020-09-09 14:21:25', 24, 23);
INSERT INTO `nearest_contact` VALUES (134, '2020-09-09 14:21:29', 24, 23);
INSERT INTO `nearest_contact` VALUES (135, '2020-09-09 14:48:45', 23, 24);
INSERT INTO `nearest_contact` VALUES (136, '2020-09-09 15:02:30', 23, 24);
INSERT INTO `nearest_contact` VALUES (137, '2020-09-09 15:03:18', 23, 24);
INSERT INTO `nearest_contact` VALUES (138, '2020-09-09 15:12:49', 23, 24);
INSERT INTO `nearest_contact` VALUES (139, '2020-09-09 15:16:00', 23, 24);
INSERT INTO `nearest_contact` VALUES (140, '2020-09-09 15:16:24', 23, 24);
INSERT INTO `nearest_contact` VALUES (141, '2020-09-09 15:27:13', 23, 24);
INSERT INTO `nearest_contact` VALUES (142, '2020-09-09 15:27:59', 23, 24);
INSERT INTO `nearest_contact` VALUES (143, '2020-09-09 15:28:16', 23, 24);
INSERT INTO `nearest_contact` VALUES (144, '2020-09-09 15:29:06', 23, 24);
INSERT INTO `nearest_contact` VALUES (145, '2020-09-09 15:29:42', 23, 24);
INSERT INTO `nearest_contact` VALUES (146, '2020-09-09 15:32:20', 23, 24);
INSERT INTO `nearest_contact` VALUES (147, '2020-09-09 15:32:25', 23, 24);
INSERT INTO `nearest_contact` VALUES (148, '2020-09-09 15:32:29', 23, 24);
INSERT INTO `nearest_contact` VALUES (149, '2020-09-09 15:46:50', 23, 24);
INSERT INTO `nearest_contact` VALUES (150, '2020-09-09 15:47:59', 23, 24);
INSERT INTO `nearest_contact` VALUES (151, '2020-09-10 09:23:38', 23, 24);
INSERT INTO `nearest_contact` VALUES (152, '2020-09-10 09:29:55', 23, 24);
INSERT INTO `nearest_contact` VALUES (153, '2020-09-10 09:31:37', 23, 24);
INSERT INTO `nearest_contact` VALUES (154, '2020-09-10 13:42:27', 23, 24);
INSERT INTO `nearest_contact` VALUES (155, '2020-09-10 14:06:51', 23, 24);
INSERT INTO `nearest_contact` VALUES (156, '2020-09-10 14:06:58', 23, 24);
INSERT INTO `nearest_contact` VALUES (157, '2020-09-10 15:15:26', 23, 24);
INSERT INTO `nearest_contact` VALUES (158, '2020-09-10 15:15:38', 23, 24);
INSERT INTO `nearest_contact` VALUES (159, '2020-09-10 15:19:45', 24, 23);
INSERT INTO `nearest_contact` VALUES (160, '2020-09-10 15:19:51', 23, 24);
INSERT INTO `nearest_contact` VALUES (161, '2020-09-10 15:22:16', 23, 24);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '用户自增id',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户密码',
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮箱',
  `create_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '创建时间',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名 ',
  `state` int(0) DEFAULT 0 COMMENT '用户状态，0、未启用， 1、正常启用 2、被封闭',
  `frend_ids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '好友id',
  `black_list` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '黑名单id',
  `head_portrait_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '头像路径',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '昵称',
  `synopsis` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '简介',
  `user_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户查询编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (11, 'eee', '528386633@qq.com', '2020-08-28 14:52:22', 'eee', 0, NULL, NULL, '/img/ph/2353d9457a9de2dbc34f89d359cafde089373ed5-06546150-e8fb-11ea-a20d-a7b65f7a1bca.svg', 'xld', '老虎不在家', 'BCFTZ4TQ5');
INSERT INTO `user` VALUES (23, 'aaa', '528386632@qq.com', '2020-08-14 10:57:41', 'aaa', 0, '24', '0', '/img/ph/15a9c19850f88625438773de0aaaafd3638a8ff9-b01bc940-ecdd-11ea-8ed5-57826f974304.png', 'zs', '牧场十万', 'BCFTZ4TQ4');
INSERT INTO `user` VALUES (24, 'bbb', '357208984@qq.com', '2020-08-14 10:57:41', 'bbb', 0, '23', NULL, '/img/ph/2353d9457a9de2dbc34f89d359cafde089373ed5-06546150-e8fb-11ea-a20d-a7b65f7a1bca.svg', 'ls', '一二三四五', 'BCFTZ4TQ3');
INSERT INTO `user` VALUES (25, 'ccc', '528386637@qq.com', '2020-08-28 14:52:22', 'ccc', 0, '', NULL, '/img/ph/2353d9457a9de2dbc34f89d359cafde089373ed5-06546150-e8fb-11ea-a20d-a7b65f7a1bca.svg', 'we', '上山打老虎', 'BCFTZ4TQ2');
INSERT INTO `user` VALUES (26, 'yyyyyy', '528386636@qq.com', '2020-09-04 10:28:01', 'yyyyyy', 0, NULL, NULL, '/img/ph/00366494c0e63694e34bc87388cfbb3fbe51d84a-40e614c0-ee56-11ea-becf-013be5c02f55.svg', 'yyy', '就去打狮子', 'BCFTZ4TQ1');
INSERT INTO `user` VALUES (27, 'uuuuuu', '528386631@qq.com', '2020-09-04 13:21:33', 'uuuuuu', 0, NULL, NULL, '/img/ph/bcffdbb5540a5ff4247c1781e2dd302bc0747cf3-7f491290-ee6e-11ea-9520-11765e979452.svg', '啦啦啦', '狮子不在家', 'BCFTZ4TQK');

-- ----------------------------
-- Table structure for user_relationship
-- ----------------------------
DROP TABLE IF EXISTS `user_relationship`;
CREATE TABLE `user_relationship`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` bigint(0) DEFAULT NULL COMMENT '用户id',
  `recently` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '最近情况',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `user_relationship_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
