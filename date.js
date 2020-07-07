// console.log(module); used first to learn more about our module
// module.exports="Hello World";
//module.exports is a js object, use its properties
//module.exports=getDate;//only passing func, not calling, dont use paranthesis


//module.exports.getDate=getDate;
// module.exports.getDate=function () {
exports.getDate=function () { //no noeed module.exports, just exports is fine, shorter hand
const today = new Date();
  
const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};
return today.toLocaleDateString("en-US", options);
// let day = today.toLocaleDateString("en-US", options);
// return day;
}
exports.getDay= function (){
    const today = new Date();
      
    const options = {
        weekday: "long",
        
    };
    
    return today.toLocaleDateString("en-US", options);
    
    }