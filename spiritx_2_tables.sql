drop database if exists spiritx_2;
create database spiritx_2;
use spiritx_2;
CREATE TABLE `User` (
  `User_ID` int AUTO_INCREMENT,
  `Username` varchar(100),
  `Password` varchar(255),
  `Is_Admin` boolean,
  `Created_date` datetime default current_timestamp,
  `Email` varchar(150),
  PRIMARY KEY (`User_ID`),
  UNIQUE (`Username`),
  UNIQUE (`Email`)
);
CREATE TABLE `Team` (
  `Team_ID` int AUTO_INCREMENT,
  `Team_Name` varchar(100),
  `Created_Date` Datetime default current_timestamp,
  `User_ID` int,
  `Initial_Budget` Decimal(10, 2),
  PRIMARY KEY (`Team_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`),
  unique (`Team_Name`)
);
CREATE TABLE `Player` (
  `Player_ID` int auto_increment,
  `Name` varchar(200),
  `University` varchar(200),
  `Category` enum('Batsman', 'All-Rounder', 'Bowler'),
  `Total_Runs` int,
  `Balls_Faced` int,
  `Innings_Played` int,
  `Wickets` int,
  `Overs_Bowled` int,
  `Runs_Conceded` int,
  `Created_at` datetime default current_timestamp,
  `Updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Values` int,
  PRIMARY KEY (`Player_ID`)
);
CREATE TABLE `Team_Members` (
  `Team_ID` int,
  `Player_ID` int,
  `Added_Date` Datetime default current_timestamp,
  PRIMARY KEY (`Team_ID`, `Player_ID`),
  FOREIGN KEY (`Team_ID`) REFERENCES `Team`(`Team_ID`),
  FOREIGN KEY (`Player_ID`) REFERENCES `Player`(`Player_ID`)
);