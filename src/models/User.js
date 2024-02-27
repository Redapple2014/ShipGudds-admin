const User = {
    login:function (loginObj) {
        var promise = new Promise( (resolve, reject) => {

            let name = 'Paul'
          
            if (name === 'Paul') {
             resolve("Promise resolved successfully");
            }
            else {
             reject(Error("Promise rejected"));
            }
           });
  }
}

export default User;