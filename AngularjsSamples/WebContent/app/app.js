/**
 * 
 */

angular.module('pwc', [ 'ui.router' ]).config(
		function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('welcome', {
				url : '/welcome',
				templateUrl : 'app/views/landingpage.html',
				controller : 'LandingPageController'
			}).state('jspdf', {
				url : '/jspdf',
				templateUrl : 'app/views/jspdf.html',
				controller:'PrintDataController'
			}).state('otherwise', {
				url : '/',
				templateUrl : 'app/views/landingpage.html'
			});
			$urlRouterProvider.otherwise('/welcome');
		}).run(function($state, $rootScope) {
	console.log('Inside the RUN method Start First')
	$rootScope.assignedData = [{"id":"20baa8fc-6bb0-4eae-aba8-58688afdab95","firstName":"test","lastName":"supervisor","username":"supervisor","positionCount":1,"classRoomCount":0,"lastTrainingDate":null,"edited":false,"checkPersons":false,"mySubject":null,"personRoles":{"subject":true,"supervisor":true,"evaluator":false,"administrator":false,"trainer":false,"analyst":false,"hr":false,"executive":false}},{"id":"000e3094-b5ce-415c-9423-55875b3ee1ae","firstName":"test","lastName":"peopletwo","username":"testpeople2","positionCount":1,"classRoomCount":0,"lastTrainingDate":null,"edited":false,"checkPersons":false,"mySubject":null,"personRoles":{"subject":true,"supervisor":false,"evaluator":false,"administrator":false,"trainer":false,"analyst":false,"hr":false,"executive":false}}];
}).controller('LandingPageController', function($state) {
	console.log('Landing controller');
}).controller('PrintDataController', function($scope,$rootScope) {
	$scope.print = function() {
		alert('Insdie the Print method ')
		var getColumns = function() { // To get Column Header's
			return [ {
				title : "First Name",
				dataKey : "fname"
			}, {
				title : "Last Name",
				dataKey : "lname"
			}, {
				title : "Signature",
				dataKey : "sign"
			}

			];
		};

		function getData() { //  To get Column data's
			var data = [];
			var assPersons = $rootScope.assignedData;
			for (var j = 0; j < assPersons.length; j++) {
				data.push({
					fname : assPersons[j].firstName,
					lname : assPersons[j].lastName,
					sign : ''
				});
			}
			return data;

		}

		var pdfsize = 'a4';
		var doc = new jsPDF('p', 'pt', pdfsize);
//		console.log('value of doc =>',angular.toJson(doc));
		doc.autoTable(getColumns(), getData(), //This is for table design
		{

			theme : 'grid', // 'striped', 'grid' or 'plain'
			tableWidth : 'wrap', // 'auto', 'wrap' or a number,
			styles : {
				fillStyle : 'DF',
				overflow : 'linebreak',
				columnWidth : 'wrap',
				lineWidth : 2,
				rowHeight : 40,
				lineColor : [ 85, 51, 27 ]
			},

			createdCell : function(cell, data) {
				cell.styles.overflow = 'linebreak';
				cell.styles.fontStyle = 'bold';
				cell.styles.fontSize = 10;
			},

			headerStyles : {
				fillColor : [ 189, 200, 255 ],
				textColor : [ 12, 1, 1 ],
				lineWidth : 2,
				lineColor : [ 0, 0, 0 ]
			},

			margin : {
				top : 50,
				left : 20,
				right : 20,
				bottom : 0
			},
			pageBreak : 'avoid',

			beforePageContent : function(data) {

				doc.setFontSize(12);
				doc.setFont("bold");
				var currentDate = "05/12/2017";
				doc.text("Attendance Sheet (" + currentDate + ")", 20, 15);
				doc.setFontSize(12);
				doc.setFont("courier");
				doc.text("Training Class Name :", 20, 30);
				var strArr = doc.splitTextToSize("Default position Name", 500)
				doc.setFontStyle('bold');
				doc.text(strArr, 175, 30);
				doc.setFontStyle('normal'); //
				doc.text("Description :" + "Default Discreption", 20, 45);

			},

			columnStyles : {
				fname : {
					columnWidth : 150
				},
				lname : {
					columnWidth : 150
				},
				sign : {
					columnWidth : 250
				}

			}
		});
		doc.save("Save PDF DEFAULT NAME" + " Training.pdf");
	}
});