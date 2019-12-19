
Use quizshow_millionaire;

/* Default Users*/
INSERT INTO users(username) values('host');
INSERT INTO permissions(iduser,host,player,viewer) values(1,true,true,true);
INSERT INTO users(username) values('viewer');
INSERT INTO permissions(iduser,host,player,viewer) values(2,false,false,true);

SELECT * FROM Users WHERE (Username='host');
SELECT viewer,player,host FROM permissions WHERE idUser=1;

/* Session States*/
INSERT INTO sessionstates(name) value('initialized');
INSERT INTO sessionstates(name) value('hosting');
INSERT INTO sessionstates(name) value('started');
INSERT INTO sessionstates(name) value('finished');


/* Questions and Answers*/
INSERT INTO questionsets(name) value('CS_Trivia');
-- 1
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Who is the creator of version-control system Git?',1);
INSERT INTO answers(idQuestion,text,correct) values(1,'Bill Gates',0);
INSERT INTO answers(idQuestion,text,correct) values(1,'Linus Torvalds',1);
INSERT INTO answers(idQuestion,text,correct) values(1,'Steve Wozniak',0);
INSERT INTO answers(idQuestion,text,correct) values(1,'Larry Page',0);
-- 2
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Computer Hard Disk was first introduced in 1956 by?',2);
INSERT INTO answers(idQuestion,text,correct) values(2,'Dell',0);
INSERT INTO answers(idQuestion,text,correct) values(2,'Apple',0);
INSERT INTO answers(idQuestion,text,correct) values(2,'Microsoft',0);
INSERT INTO answers(idQuestion,text,correct) values(2,'IBM',1); 
-- 3
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'A folder in windows computer cant be made with the name?',3);
INSERT INTO answers(idQuestion,text,correct) values(3,'can',0);
INSERT INTO answers(idQuestion,text,correct) values(3,'con',1);
INSERT INTO answers(idQuestion,text,correct) values(3,'mak',0);
INSERT INTO answers(idQuestion,text,correct) values(3,'make',0); 
-- 4
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Which one is an example of connectionless protocols?',4);
INSERT INTO answers(idQuestion,text,correct) values(4,'TCP',0);
INSERT INTO answers(idQuestion,text,correct) values(4,'IPX/SPX',0);
INSERT INTO answers(idQuestion,text,correct) values(4,'Frame Relay',0);
INSERT INTO answers(idQuestion,text,correct) values(4,'UDP',1); 
-- 5
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Which company first developed Java programming language?',5);
INSERT INTO answers(idQuestion,text,correct) values(5,'Microsoft',0);
INSERT INTO answers(idQuestion,text,correct) values(5,'Google',0);
INSERT INTO answers(idQuestion,text,correct) values(5,'Sun Microsystems',1);
INSERT INTO answers(idQuestion,text,correct) values(5,'IBM',0); 
-- 6
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Where are cookies stored?',6);
INSERT INTO answers(idQuestion,text,correct) values(6,'On the client',1);
INSERT INTO answers(idQuestion,text,correct) values(6,'In HTML',0);
INSERT INTO answers(idQuestion,text,correct) values(6,'In web.xml',0);
INSERT INTO answers(idQuestion,text,correct) values(6,'None of these',0); 			
-- 7
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Which type of processing speed measurement is used primarily with supercomputer?',7);
INSERT INTO answers(idQuestion,text,correct) values(7,'Gigahertz',0);
INSERT INTO answers(idQuestion,text,correct) values(7,'MIPS',0);
INSERT INTO answers(idQuestion,text,correct) values(7,'Flops',1);
INSERT INTO answers(idQuestion,text,correct) values(7,'Nacron',0); 			
-- 8
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Who is considered as the father of computing?',8);
INSERT INTO answers(idQuestion,text,correct) values(8,'Claude Shannon',0);
INSERT INTO answers(idQuestion,text,correct) values(8,'Charles Babbage',1);
INSERT INTO answers(idQuestion,text,correct) values(8,'Von Neumann',0);
INSERT INTO answers(idQuestion,text,correct) values(8,'Graham Bell',0); 			
-- 9
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'The information transfer between CPU and cache is in terms of?',9);
INSERT INTO answers(idQuestion,text,correct) values(9,'Bytes',0);
INSERT INTO answers(idQuestion,text,correct) values(9,'Bits',0);
INSERT INTO answers(idQuestion,text,correct) values(9,'Words',1);
INSERT INTO answers(idQuestion,text,correct) values(9,'None of these',0); 		
-- 10
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Which one of the following languages is usually implemented with an interpreter?',10);
INSERT INTO answers(idQuestion,text,correct) values(10,'PASCAL',0);
INSERT INTO answers(idQuestion,text,correct) values(10,'Assembly',1);
INSERT INTO answers(idQuestion,text,correct) values(10,'COBOL',0);
INSERT INTO answers(idQuestion,text,correct) values(10,'BASIC',0); 		
-- 11
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'In a Database Management System (DBMS), the content and the location of the data is defined by?',11);
INSERT INTO answers(idQuestion,text,correct) values(11,'Subdata',0);
INSERT INTO answers(idQuestion,text,correct) values(11,'Sequence Data',0);
INSERT INTO answers(idQuestion,text,correct) values(11,'Multi Dimensional Data',0);
INSERT INTO answers(idQuestion,text,correct) values(11,'Meta Data',1); 	
-- 12
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Which of the following is not used as secondary storage?',12);
INSERT INTO answers(idQuestion,text,correct) values(12,'Semiconductor Memory',0);
INSERT INTO answers(idQuestion,text,correct) values(12,'Magnetic Disk',1);
INSERT INTO answers(idQuestion,text,correct) values(12,'Magnetic Drum',0);
INSERT INTO answers(idQuestion,text,correct) values(12,'Magnetic Tape',0); 	
-- 13
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'How many users can access a share folder simultaneously from a Windows XP machine?',13);
INSERT INTO answers(idQuestion,text,correct) values(13,'20',0);
INSERT INTO answers(idQuestion,text,correct) values(13,'15',0);
INSERT INTO answers(idQuestion,text,correct) values(13,'10',1);
INSERT INTO answers(idQuestion,text,correct) values(13,'Unlimiteed',0); 	
-- 14
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'Which mobile company first introduced the Emoji internationally on their mobile devices?',14);
INSERT INTO answers(idQuestion,text,correct) values(14,'Apple',1);
INSERT INTO answers(idQuestion,text,correct) values(14,'Samsung',0);
INSERT INTO answers(idQuestion,text,correct) values(14,'Motorola',0);
INSERT INTO answers(idQuestion,text,correct) values(14,'Blackberry',0); 	
-- 15
INSERT INTO questions(idQuestionSet,text,difficulty) values(1,'In a compiler, grouping of characters into tokens is done by?',15);
INSERT INTO answers(idQuestion,text,correct) values(15,'Scanner',1);
INSERT INTO answers(idQuestion,text,correct) values(15,'Parser',0);
INSERT INTO answers(idQuestion,text,correct) values(15,'Code Generator',0);
INSERT INTO answers(idQuestion,text,correct) values(15,'Code Optimizer',0); 	



