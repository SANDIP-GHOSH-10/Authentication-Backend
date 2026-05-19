import User from "../models/user-model.js";

export const userRegisterSchema = {
  email: {
    exists: {
      errorMessage: "Email is required"
    },
    notEmpty: {
      errorMessage: "Email cannot be empty"
    },
    isEmail: {
      errorMessage: "Invalid email format"
    },
    trim: true,
    normalizeEmail: true,
    custom: {
      options: async (value) => {
        const user = await User.findOne({ email: value });

        if (user) {
          throw new Error("Email already in use");
        }

        return true;
      }
    }
  },

  password: {
    exists: {
      errorMessage: "Password is required"
    },
    notEmpty: {
      errorMessage: "Password cannot be empty"
    },

    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
      },
      errorMessage:
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
    }
  }
};

export const userLoginSchema = {
  email: {
    exists: {
      errorMessage: "Email is required"
    },
    notEmpty: {
      errorMessage: "Email cannot be empty"
    },
    isEmail: {
      errorMessage: "Invalid email format"
    },
    trim: true,
    normalizeEmail: true
  },

  password: {
    exists: {
      errorMessage: "Password is required"
    },
    notEmpty: {
      errorMessage: "Password cannot be empty"
    }
  }
};





















// import User from "../models/user-model.js";
// export const userRegisterSchema = {
//     email: {
//         exists:{
//             errorMessage:"Email is required"
//         },
//         notEmpty:{
//             errorMessage:"Email cannot be empty"
//         },
//         isEmail:{
//             errorMessage:"Invalid email format"
//         },
//         trim : true,
//         normalizeEmail : true,
//         custom : {
//             options : async (value)=>{ 
//                 try {
//                     const user = await User.findOne({email:value});
//                     if(user){
//                         throw new Error("Email already in use");
//                     }
//                 } catch (err) { 
//                     throw new Error(err.message);
//                 }
//                 return true;
//             }
//         }
//     },
//     password: {
//         exists:{
//             errorMessage:"Password is required"
//         },
//         notEmpty:{
//             errorMessage:"Password cannot be empty"
//         },
//         isstrongPassword:{
//             options:{
//                 minLength:6,
//                 minLowercase:1,
//                 minUppercase:1,
//                 minNumbers:1,
//                 minSymbols:0
//             },
//             errorMessage:"Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
//         }

//     }

// }


// export const userLoginSchema = {
//     email: {
//         exists:{
//             errorMessage:"Email is required"
//         },
//         notEmpty:{
//             errorMessage:"Email cannot be empty"
//         },
//         isEmail:{
//             errorMessage:"Invalid email format"
//         },
//         trim : true,
//         normalizeEmail : true
//     },
//     password: {
//         exists:{
//             errorMessage:"Password is required"
//         },
//         notEmpty:{
//             errorMessage:"Password cannot be empty"
//         }
//     }
// }