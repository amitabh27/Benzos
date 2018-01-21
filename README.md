# Benzos
Mercedes Benz

This Idea aims at building a Software Solution "Benzos Carriers" which will enable vendors as well as end users deliver their products effortlessly,securely and economically with the help of fleet of Mercedes Benz self-driving vans (viewed as connected Multi-agents moving around the city).



Problem Statement :
Currently vendor services like Restaurant's Home Delivery Service,Food Delivery Startups like Swiggy,FoodPanda,TinyOwl etc, Food Joints like Dominos,Pizza Hut,McDonalds etc. , Courier Services like DTDC,FedEx,DHL,BlueDart etc,Online Grocery,Medicine and Supermarkets, E-commerce companies like Amazon,Flipkart etc within a city rely on fleet of bikers and delivery boys to deliver their products to the customers. These individual fleets lead to the ever-growing traffic problems in a Metropolitan City plus incur a large amount of revenue to be spent by these vendors in maintaining the delivery staff as well as the delivery vehicles.




Metrics Involved :
Lets analyze the metrics involved for the well-know Food Joint "Dominos Pizza" in United States of America :

As per Wikipedia,Dominoss had approximately 11,000 stores as of the first quarter of 2014, with 4,986 in the US.
Lets make a fair assumption that each of these stores has a fleet of 10 bikers to function smoothly accounting to a humongous count of 50,000 bikes owned by dominos in US.
As per the Statista Surveys conducted in 2015 there were officially 900,000 bikes on road in US and as per Payscale on an average a pizza delivery person earns 20,000$ per month which can go till 28,000$ per month in US.
Thus approximately the largest Food Chain in US owns 5% of the bikes on road and spends 20k X 50K X 12$ amount on just delivery service of the business.
Like these several businesses maintain their own fleets to deliver goods thus aggravating the problems of Metro Cities like Traffic and air pollution.What if we could aggregate the delivery service and run it as Shared Service, thats where we pitch in the "Benzo carriers" a software solution relying on a fleet of autonomous Mercedes Cargo vans.



Suggested Solution :
Suppose we have 4 requests arisising at some point of time :

Carrying a E-commerce deliverable from A to G
Carrying bunch of couriers to be delivered in and around location F
Delivering a Grocery Order from B to C
Delivering a delicate electronic item from C to E
Delivering a Pizza from B to F


Current Scenario :

How does the current delivery service addresses the above deliverables within a city:

E-commerce company like Flipkart orders the e-kart biker to pick the item from the vendor/warehouse and deliver it to end user
Logistic services like Blue-Dart and DHL have their own delivery-chain to pick the couriers from that city's local DHL centers to doorstep delivery.
Startups like Grofers and BigBasket use the local logistic services for doorstep delivery.
Big electronic stores like Croma or Small enterprises again rely on local logistics.
Pizza Delivery relies on their own fleet of delivery professionals.


Future Scenario:

All the vendors use a ChatBot to book a space in a carrier.
The application then runs optimized algorithms to find the nearest member of the fleet and assigns the job to it.
Thus for example the Benz carrier can be viewed as a vehicle :
Carrying a E-commerce deliverable from A to G
Carrying bunch of couriers to be delivered in and around location F
Delivering a Grocery delivery from B to C
Delivering a delicate electronic item from C to E
Delivering a Pizza from B to F


Business Model for Mercedes Benz :
In case of working as a Carrier for several kinds of vendors, Benz at an organizational level could sign deals with the vendor-chains to allow them to use the Benz carriers as delivery vehicles. It would be a Win-Win situation for both because then vendors would save considerable portion of revenue spent on having delivery boys as well as in maintaining the delivery vehicles and would partner up with Benz which would charge nominally for delivery services. Benz on the other hand would have a huge profit because in one trip it could earn Service-charge from several vendors by satisfying multiple requests in one go.




Implementation :


Modules Involved:

ChatBot as User Interface : Messenger ChatBots make the interaction reach and helps to customize the response for users by remembering past conversations.
Server Side Scripting : Using NodeJS as Server Side language to configure API endpoints which would be queried by Bot to respond back to end users.
Database Implementations : Using NoSQL databases to allow flexiblitiy in terms of Schematic Structure of data in Logistic services. MongoDB is the most ideal choice hosted on mLAB.
Payment Gateways : The Mode of payment by the vendors to Benz would be through Payment Webhooks provided by Facebook's Platform APIs.
OTP Generation module : Using SMS gateways like TextLocal.


Technology Stack:

Programming Languages : NodeJS
Databases : MongoDB
Database Hosting : mLAB
Server hosting : Heroku
APIs for controlling Benz Van's functionalities : Benz SDK and Daimler APIs ( Upcoming Connected-Vehicle APIs)
APIs for Commuting and identifying group of deliverables that can be grouped together : Google's direction APIs and Google maps APIs.
APIs for Car Parking when the van is not in service : Google's Nearby and Place APIs with types='parking' to find the nearest parking slot and then direction APIs to reach the same.
APIs for Car Servicing when the autonomous van detects fault : Daimler's Dealer API for placing a servicing request to nearby Benz service center.
APIs for Car Refueling when the autonomous van detects that it's low on fuel between pickups : Google's Nearby APIs with type='gas_station' to find the nearest gas station then Google direction APIs to reach the same.




Critical usecases and how we plan to address it ? :

Vehicle Design : The Vehicle that we plan to use here is a Self-Driving Mercedes Cargo Van with Smart Shelves inside the van with compartments of different sizes(Small,Medium and Large) to accommodate deliverables of varying sizes.

End Users : The end user of the proposed idea is either a Vendor looking to transfer deliverables to their customer's doorstep OR a common-man willing to take the benefit of a doorstep to doorstep delivery process within a city.




Usecase 1 : End User requests for a commodity delivery

End user open the messenger app and starts the conversation with ChatBot by saying 'Get Started'. Bot offers the menu and the end user selects 'Start a delivery'. Bot then asks for other input parameters like destination for delivery,customer's contact number,number of slots in van needed and of which sizes.
Bot immediately updates the database by inserting a new transaction with the end user's current location as source and other delivery paramters.
Server Side scripting now calculates the delivery-charge by taking into account the number of slots in van booked and their sizes,distance,estimated time,current traffic conditions on shortest route using Google's Traffic model and Map APIs.
Server then sends the response in plain-text form back to chat bot informing the vendor about the delivery-charge followed by Messenger Platform's Payment API calls for smooth payment to Mercedes.
On successful payment, the Server Side Scripting updates the Database transaction with the slot details as requested by the vendor.
Now the Server Side Processing logic finds out a cab to assign this request by keeping in mind following parameters:

• Finding the nearest cab (using GPRS locations of SMART Cars)

• Finding the longest common path intersections between the routes of nearby cars and the shortest route for this request. (using Google direction APIs to find maximum intersection between the Latitudes-Longitudes of prominent locations on a route)

• Availability of slots in terms of number and sizes in the car.

Once a cab is picked up, the server side scripting updates the database transaction by adding the details of the cab that is going to satisfy the request and the vendor is updated via chatbot with the cab details that is assigned to service his request along with the slot numbers in which he is expected to keep the deliverables.Also the Smart cab is notified about the newly assigned request.Now the Cab updates its local database with the new request details and does following computations to decide on the order in which it needs to satisfy the requests it has :

• Align goals in terms of the proximity between from where the new request needs to be entertained and the locations where the onboarded requests would terminate.

• When the autonomous van is about to arrive at one of the locations from where the deliverable is going to be picked up, it sends a notification to the server say 500meters prior to pick-up point then the server sends a alert message on the chat bot to the vendor. Now vendor gets ready with the deliverable, once the cab arrives it sends a notification back to server that it has reached the destination. On receiving this notification, Server sends a OTP to vendor's registered phone number and expects him to read it loud to the Van so that the person is authenticated and now using Daimler's Connected-Vehicle APIs the server opens the doors of the vehicle and then the vendor keeps the deliverable in the previously obtained slot number.The RFIDs in smart shelves immediately update the local database of Smart Cab once a deliverable is placed in a slot, the Cab Software module finds out if there is a mismatch in the slot numbers updated by RFID and the ones designated for this request implying the vendor is placing the deliverables wrongly and hence a response is triggered to the server and server sends an alert to vendor about the same. If placed correctly,server confirms the right placement of commodities on the shelf and asks the vendor to get out of the van and then server triggers the closing of doors after an interval of one minute.At the same time, server sends a SMS to the customer informing him about the cab details that is bringing his deliverable along with the slot number in the Van in which his deliverable has been placed.

• Once the new request is picked up then the autonomous car itself re-computes the paths to several destinations and starts the journey back.






Usecase 2 : Enduser accepts the commodity delivery

When the Cab is about to reach one of the requests' destination it sends SMS to the customer to be ready at the meeting point.
On Arriving at the destination, the person at meeting point needs to be authenticated hence the Cab sends a notification to server that it had reached one of its endpoint and thus the server sends a OTP to customer's registered phone number asking him to read it loud to the Cab. Mercedes Cars already have this functionality of interacting with people through built in micro phones. Once authenticated, the Cab sends the response to Server which then triggers the opening of Doors to allow the customer to pick up his deliverable.
When the user picks up the deliverable, the RFID immediately updates the local database of Cab that these slots were emptied currently. Then the Cab software immediately compares that against the slot numbers alloted for this request . If there is a mismatch then it immediately alerts the customer with the internal Mic that you are picking up the wrong deliverables and reads out the slot numbers again for him.
If no mismatch is found then the Cab updates the server that this request has been satisfied and in turn the server sends confirmation notifications to both the vendor via Chatbot and the end user via SMS. Finally server uses Daimlers APIs to close the doors and car goes on with further requests to be satisfied.
If mismatch occurs and the customer tries to steal the deliverables by not keeping them back again then immediately the Cab updates the server to close the doors and sends a Alarming Notification to nearest Cops Sation with the image of the thief captured using the dashboard camera.





Usecase 3 : Vendor doesn't arrive OR the customer doesn't arrive

After reaching the source, if Vendor doesn't authenticates hhttps://drive.google.com/file/d/1fZ0f330PhKG39NHtNLnmwGelTJOvnj0_/viewimself via OTP to the Cab. The Cab times out in 5 minutes and reports to the server that the vendor didn't turn up leading to cancellation of request and imposing of fine which needs to be paid when the same vendor requests again.
After reaching the destination, if the Customer didn't turn up after waiting for 10 minutes then the Cab updates the server and goes ahead to fulfill the remaining requests. These are rare cases wherein the customer after paying up the price for commodity to the vendor didn't turn up but are likely to happen. Here the cab updates the destination of such requests same as source and entertains it as a new request. The Server is notified which in turn updates its database and informs the vendors about the same. On the other hand, Cab sends a SMS to the customer that delivery was attempted but since you didn't turn the deliverable is sent back to the concerned vendor.
P.S. : First mile solution is addressed in Usecase 1 , Last mile solution is addressed in Usecase 2, No turn up is addressed in Usecase 3.

Uploaded file is a animated video depicting the working of proposed solution.
https://drive.google.com/file/d/1Jj6F4WsmP3bHd1-pyX5Lf6TkZmQ9OK-v/view
https://drive.google.com/file/d/1fZ0f330PhKG39NHtNLnmwGelTJOvnj0_/view
