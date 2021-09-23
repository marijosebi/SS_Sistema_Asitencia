import axios from "axios";
import qs from 'qs';
export default class Constancy {
    data='';
 
    constructor(data) 
    {
      this.data = data;
     /* this.assistent = assistent;
      this.expedite = expedite;*/

    }
    insert() {
        var moment = require("moment");
        var date = moment(new Date()).format();
        console.log(date);
        this.data.push(
            {date:date}
        )
       axios.post("http://localhost:8081/api/constancy", qs.stringify(this.data),{
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
       
        }).then((response) => {
    console.log(response);
    if(response.status==200)
    this.new=response.data.data._id;
    this.getElement()
  }, (error) => {
    console.log(error);
  });
      }

      get()
      {
           axios.get("http://localhost:8081/api/constancy/" + this.new).then((result) => {
        console.log(result);
        this.element=result.data.data;
            console.log(this.element);
      })
      }
}

