const ZKLib = require('./zklib')
const test = async () => {

   try {
        const zkInstance = new ZKLib('192.168.1.50', 4370, 10000, 4000);
 
        // Create socket to machine 
        const socket = await zkInstance.createSocket()

        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
        console.log("############# Device INFO #########")
        console.log(await zkInstance.getInfo())


        // Disconnect the machine ( don't do this when you need realtime update :))) 
        // const users = await zkInstance.getUsers();
        // console.log(users.data.length);
        const attendences = await zkInstance.getAttendances();
        console.log("@@@@@@ Attendence Info #############");
        //console.log(attendences.data);
        const users = await zkInstance.getUsers();
        const aggregatedData = {};
        //console.log(users);

        //console.log(mappedData);
        attendences.data.forEach(obj => {
        if (!aggregatedData[obj.deviceUserId]) {
            //const date = new Date(isoString);
            // Get the local date and time combined
            //const localDateTime = date.toLocaleString(); // Get local date and time

            aggregatedData[obj.deviceUserId] =  {
                attendence: [],
                usernames: "",

            };
        }
        // aggregatedData[obj.deviceUserId]["name"] = userdata.find( user => {
        //     user.userId === obj.deviceUserId ?.name || null
        // });
        const user = users.data.find(u => {
            //console.log(u);
            return u.userId === obj.deviceUserId
        });
        aggregatedData[obj.deviceUserId]["usernames"] = user.name;
        //console.log(obj.deviceUserId);
        //console.log(user);
        //users.find(user => user.userId === record.deviceUserId)?.name || null))
        let date = new Date(obj.recordTime);
        let localDate = date.toLocaleDateString();
        let localTime = date.toLocaleTimeString();
        aggregatedData[obj.deviceUserId]["attendence"].push(`${localDate} ${localTime}`);
        });

        console.log(aggregatedData);
        //console.log("###### USer Info @@@@@@@@@@@@@")
        // const smallAt = await zkInstance.getSocketStatus();
        // console.log(smallAt);
        //const dtime = await zkInstance.getTime();
        //console.log(dtime);

    } catch (e) {
        console.error(e);
    }

}
// Set the interval to call the method every 10 minutes (600,000 milliseconds)
const interval = 1 * 60 * 500; // 10 minutes in milliseconds
//setInterval(test, interval);
test()
