var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var request=require('request');

var err="No information available: Please check the details that you have provided";

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

var port = process.env.PORT || 5000;


var server=app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
  


app.get('/',function(req,res){
	res.status(200).send('Welcome to Ami\'s RESTFUL Server');
});



//Place Orders
app.get('/benzoscarriers/placeOrder/:src/:dest/:phone/:slottype',function(req,res){
	

	var req_id=(Math.floor(100000 + Math.random() * 900000)).toString();
	var expected_delivery="11:05";
	var otp1=(Math.floor(100000 + Math.random() * 900000)).toString();
	var otp2=(Math.floor(100000 + Math.random() * 900000)).toString();
	var source=req.params.src;
	var destination=req.params.dest;
	var phone=req.params.phone;
	var slottype=req.params.slottype;
	var numberOfSlots=1;
	
	for(var i=0;i<slottype.length;i++)
	{
			if(slottype.charAt(i)==',')
				numberOfSlots++;
	}
	
	var route11=new Array();var route12=new Array();var r1=1;					var c1=0;	var match=-1;
	var route21=new Array();var route22=new Array();var r2=1; var f2=0;			var c2=0;
	var route31=new Array();var route32=new Array();var r3=1; var f3=0;
	var f4=0;
	
	
	var result="";
	function fifth()
	{
		return res.status(200).send('{ \"data\":{\"type":\"text\",\"text\":\"'+result+'\"}}');
	}
	
	function fourth(callback)
	{
					if(f4==0)
					{
					console.log("inside fourth");
					
					request.post('https://api.mlab.com/api/1/databases/benzoscarriers/collections/Request?apiKey=0IUPta4Xti13RA5KsXbUItjhVK938r0t',
						{ json: { 'req_ID': req_id,'src':source,'dest':destination,'no_slots':numberOfSlots,'type_slot':slottype,'customer_no' : phone,'expected_delivery'
						: expected_delivery,'otp1': otp1,'otp2':otp2 } },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log(body);
							}
						});
					
					
					if(match==1)
					{
						console.log("Match with car 1122");
						result="Van-1122 will reach you by "+expected_delivery+" .Slot Number assigned to you is S2 and OTP for verification is "+otp1+".Also you can track your order with the delivery ID-"+req_id;
						
						request.put('https://api.mlab.com/api/1/databases/benzoscarriers/collections/Car?q={"car_ID": "1122"}&apiKey=0IUPta4Xti13RA5KsXbUItjhVK938r0t',
						{ json: { "$set":{"s2":req_id} } },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log(body);
							}
						});
					}
					else
					{	
						console.log("Match with car 1234");
						result="Van-1234 will reach you by "+expected_delivery+" .Slot Number assigned to you is S2 and OTP for verification is "+otp1+".Also you can track your order with the delivery ID-"+req_id;
					
						request.put('https://api.mlab.com/api/1/databases/benzoscarriers/collections/Car?q={"car_ID": "1234"}&apiKey=0IUPta4Xti13RA5KsXbUItjhVK938r0t',
						{ json: { "$set":{"s2":req_id} } },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log(body);
							}
						});
					}
					}
					
					
					f4=1;
					callback(fifth);
	}
	
	function third(callback)
	{
					console.log("inside third");
					request('https://maps.googleapis.com/maps/api/directions/json?origin='+source+'&destination='+destination+'&mode=driving&key=AIzaSyCweXwBZ82TU1ZdOCFoDFYhx9l75vh6E50', function (error, response, body) {
						if (!error && response.statusCode == 200) 
						{
						
							body = body.replace('\u003c/b','');	
							body = body.replace('\u003e/','');
							body = body.replace('\u003cb','');
							body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
							body = body.replace('<div>','');
							body = body.replace('</div>','');
							var o=JSON.parse(body);
							
							
							for (var i=0;i<o.routes[0].legs[0].steps.length && f3==0;i++)
							{  
							   route31[r3]=o.routes[0].legs[0].steps[i].end_location.lat;
							   route32[r3]=o.routes[0].legs[0].steps[i].end_location.lng;
							   console.log("---->"+route31[r3]+"****"+route32[r3]+"\n");
							   r3++;
							}
							
							console.log("third----------------------------------------------------------------------------"+r3);
							
							for(var i=1 ; i<r1 && i<r3 && f3==0;i++)
							{
									if(route11[i]==route31[i] && route12[i]==route32[i])
										c1++;
							}
							for(var i=1 ; i<r2 && i<r3 && f3==0;i++)
							{
									if(route21[i]==route31[i] && route22[i]==route32[i])
										c2++;
							}
							
							if(c1>c2)
								match=1;
							else
								match=2;
							
						console.log("c1="+c1+" c2="+c2);	
						console.log("match="+match);	
						f3=1;
						console.log("calling fourth");	
						callback(fourth);
						}
					});

	}
	
	function second(callback)
	{
		var m="banashankari";
					console.log("inside second");
					request('https://maps.googleapis.com/maps/api/directions/json?origin='+source+'&destination='+m+'&mode=driving&key=AIzaSyCweXwBZ82TU1ZdOCFoDFYhx9l75vh6E50', function (error, response, body) {
						if (!error && response.statusCode == 200) 
						{
						
							body = body.replace('\u003c/b','');	
							body = body.replace('\u003e/','');
							body = body.replace('\u003cb','');
							body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
							body = body.replace('<div>','');
							body = body.replace('</div>','');
							var o=JSON.parse(body);
							
							
							for (var i=0;i<o.routes[0].legs[0].steps.length && f2==0;i++)
							{  
							   route21[r2]=o.routes[0].legs[0].steps[i].end_location.lat;
							   route22[r2]=o.routes[0].legs[0].steps[i].end_location.lng;
							   console.log("---->"+route21[r2]+"****"+route22[r2]+"\n");
							   r2++;
							}
							f2=1;
							console.log("second----------------------------------------------------------------------------"+r2);
							
							
						console.log("calling third");	
						callback(third);
						}
					});

	}
	
	
	function first(callback)
	{
		var m="majestic bangalore";
		request('https://maps.googleapis.com/maps/api/directions/json?origin='+source+'&destination='+m+'&mode=driving&key=AIzaSyCweXwBZ82TU1ZdOCFoDFYhx9l75vh6E50', function (error, response, body) {
			if (!error && response.statusCode == 200) 
			{
			
				body = body.replace('\u003c/b','');	
				body = body.replace('\u003e/','');
				body = body.replace('\u003cb','');
				body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
				body = body.replace('<div>','');
				body = body.replace('</div>','');
				var o=JSON.parse(body);
				
				
				for (var i=0;i<o.routes[0].legs[0].steps.length;i++)
				{  
				   route11[r1]=o.routes[0].legs[0].steps[i].end_location.lat;
				   route12[r1]=o.routes[0].legs[0].steps[i].end_location.lng;
				   console.log("---->"+route11[r1]+"****"+route12[r1]+"\n");
				   r1++;
				}
				
				console.log("first----------------------------------------------------------------------------"+r1);
				
				
			console.log("calling second......");
			callback(second);
			}
		});
		
	}
	
	
	
	
	first(second);
	

});


//Track Orders
app.get('/benzoscarriers/trackOrder/:deliveryID',function(req,res){
	
	var id=req.params.deliveryID;
	var result="hey";
	var target="";
	var curr_lat="";
	var curr_lot="";
	var source="";
	
	function fourth()
	{
	return res.status(200).send('{ \"data\":{\"type":\"text\",\"text\":\"'+result+'\"}}');
	}
	
	function third(callback)
	{
			request('https://maps.googleapis.com/maps/api/directions/json?origin='+curr_lat+','+curr_lot+'&destination='+source+'&mode=driving&key=AIzaSyCweXwBZ82TU1ZdOCFoDFYhx9l75vh6E50', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				
					body = body.replace('\u003c/b','');	
					body = body.replace('\u003e/','');
					body = body.replace('\u003cb','');
					body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
					body = body.replace('<div>','');
					body = body.replace('</div>','');
					var o=JSON.parse(body);
					
					console.log("------>*****"+body);
					result="The Van-"+target+"carrying the deliverable is currently located at "+o.routes[0].legs[0].start_address+" and will reach in another "+o.routes[0].legs[0].duration.text;
					
					
				console.log("calling fourth......");
				callback(fourth);
				}
			});
	}
	
	function second(callback)
	{
				request('https://api.mlab.com/api/1/databases/benzoscarriers/collections/Request?apiKey=0IUPta4Xti13RA5KsXbUItjhVK938r0t', function (error, response, body) {
					if (!error && response.statusCode == 200) 
					{
						
						console.log("---->"+body+"-----");
						var o=JSON.parse(body);
						for(var i=0;i<o.length;i++)
						{
							var temp=o[i];
							if(temp.req_ID==id)
							{
								source=temp.src;
								console.log("Destination for request is="+source);
							}
						}
						
					callback(third);
					}
				});
	}
	
	function first(callback)
	{
		request('https://api.mlab.com/api/1/databases/benzoscarriers/collections/Car?apiKey=0IUPta4Xti13RA5KsXbUItjhVK938r0t', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
					
					console.log("---->"+body+"-----");
					var o=JSON.parse(body);
					for(var i=0;i<o.length;i++)
					{
					
						var temp=o[i];
						if(temp.s1==id || temp.s2==id || temp.s3==id || temp.s4==id || temp.s5==id || temp.m1==id || temp.m2==id || temp.m3==id || temp.l1==id || temp.l2==id)
						{
							
							target=temp.car_ID;
							curr_lat=temp.car_location_latitude;
							curr_lot=temp.car_location_longitude;
							console.log("matched with car"+target+" coordinates="+curr_lat+" "+curr_lot);
							break; 
						}
						
					}
					
				callback(second);
				}
				});
	}
	first(second);
	

});

//Display Cars

app.get('/benzoscarriers/cars',function(req,res){
	
	var id=req.params.deliveryID;
	var result="";
	function second()
	{
	return res.status(200).send(result);
	}
	
	function first(callback)
	{
		
	request('https://api.mlab.com/api/1/databases/benzoscarriers/collections/Car?apiKey=0IUPta4Xti13RA5KsXbUItjhVK938r0t', function (error, response, body) {
    if (!error && response.statusCode == 200) 
	{
		
		console.log("---->"+body+"-----");
		result=result.concat("<html><body><br><br><br><br><br><br><br><br><table CELLPADDING=\"7\" align=\"center\" border=\"1\">");
		result=result.concat("<tr bgcolor=\"#FFFF66\"><font color=\"white\"><td><b>Van Number</b></td><td><b>Latitute</b></td><td><b>Longitude</b></td><td><b>S1</b></td><td><b>S2</b></td><td><b>S3</b></td><td><b>S4</b></td><td><b>S5</b></td><td><b>M1</b></td><td><b>M2</b></td><td><b>M3</b></td><td><b>L1</b></td><td><b>L2</b></td></font></tr>");
		var o=JSON.parse(body);
		for(var i=0;i<o.length;i++)
		{
			if(i%2==0)
			result=result.concat("<tr bgcolor=\"#f2f2f2\">");
			else
			result=result.concat("<tr bgcolor=\"#ddd\">");
		
			var temp=o[i];
			
			result=result.concat("<td>");result=result.concat(temp.car_ID);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.car_location_latitude);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.car_location_longitude);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.s1);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.s2);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.s3);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.s4);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.s5);result=result.concat("</td>");
			
			result=result.concat("<td>");result=result.concat(temp.m1);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.m2);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.m3);result=result.concat("</td>");
			
			result=result.concat("<td>");result=result.concat(temp.l1);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.l2);result=result.concat("</td>");
	
			result=result.concat("</tr>");
		}
		result=result.concat("</table></body></html>");
		
		callback(second);
	}
	});
	
	}
	first(second);
	

});


//Display Requests
app.get('/benzoscarriers/requests',function(req,res){
	
	var id=req.params.deliveryID;
	var result="";
	function second()
	{
	return res.status(200).send(result);
	}
	
	function first(callback)
	{
		
	request('https://api.mlab.com/api/1/databases/benzoscarriers/collections/Request?apiKey=0IUPta4Xti13RA5KsXbUItjhVK938r0t', function (error, response, body) {
    if (!error && response.statusCode == 200) 
	{
		
		console.log("---->"+body+"-----");
		result=result.concat("<html><body><br><br><br><br><br><br><br><br><table CELLPADDING=\"7\" align=\"center\" border=\"1\">");
		result=result.concat("<tr bgcolor=\"#FFFF66\"><font color=\"white\"><td><b>Request ID</b></td><td><b>Source</b></td><td><b>Destination</b></td><td><b>Number of slots</b></td><td><b>SlotType</b></td><td><b>Customer's phone</b></td><td><b>Expected Delivery</b></td><td><b>OTP 1</b></td><td><b>OTP 2</b></td></font></tr>");
		var o=JSON.parse(body);
		for(var i=0;i<o.length;i++)
		{
			if(i%2==0)
			result=result.concat("<tr bgcolor=\"#f2f2f2\">");
			else
			result=result.concat("<tr bgcolor=\"#ddd\">");
		
			var temp=o[i];
			
			result=result.concat("<td>");result=result.concat(temp.req_ID);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.src);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.dest);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.no_slots);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.type_slot);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.customer_no);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.expected_delivery);result=result.concat("</td>");
			
			result=result.concat("<td>");result=result.concat(temp.otp1);result=result.concat("</td>");
			result=result.concat("<td>");result=result.concat(temp.otp2);result=result.concat("</td>");
	
			result=result.concat("</tr>");
		}
		result=result.concat("</table></body></html>");
		
		callback(second);
	}
	});
	
	}
	first(second);
	

});
