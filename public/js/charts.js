let socket;

function init () {
 socket = io.connect("http://localhost:3000");
 let ctx = document.getElementById("myChart").getContext("2d");
 let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Google',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
		    },
		    options: {
		        animation: false,
			    //Boolean - If we want to override with a hard coded scale
			    scaleOverride: true,
			    //** Required if scaleOverride is true **
			    //Number - The number of steps in a hard coded scale
			    scaleSteps: 10,
			    //Number - The value jump in the hard coded scale
			    scaleStepWidth: 10,
			    //Number - The scale starting value
			    scaleStartValue: 0 
		    }
		});
    socket.on('updateChart', (data) => {
	     addData(myChart, data.label, data.value);
       });
}


function addData(chart, label, data) {
	chart.data.labels.push(label);
	chart.data.datasets.forEach((dataset) => {
	    dataset.data.push(data);
	});
	chart.update();
}
       
$(init);

