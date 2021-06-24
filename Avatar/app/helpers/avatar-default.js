let avatarDefault = (gender) => {
    if (gender == 'm'){
        return {eyes: "01", nose: "01", mouth: "01"}
    }else{
        return {eyes: "02", nose: "02", mouth: "02"}
    }
}
module.exports = avatarDefault;
