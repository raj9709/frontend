export const validateEmail = (email) =>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z]{2,8})?$/;
    return regex.test(email)
}

export const getInitials = (name)=>{
    if (!name) return "";
        
    const words = name.split(" ")
    let initials = ""

   for (let i = 0; i < Math.min(words.length,2); i++) {
    initials+=words[i][0];
    
   }

   return initials.toUpperCase();
}