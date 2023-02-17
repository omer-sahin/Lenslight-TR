
const getIndexPage = (req,res)=>{



res.render("index",{
    pages:"index"
})

};
const getAboutPage=(req,res)=>{
    res.render("about",{
        pages:"about"
    })

}

const getRegisterPage=(req,res)=>{
    res.render("register",{
        pages:"register"
    })

}
const getLoginPage=(req,res)=>{
    res.render("login",{
        pages:"login"
    })

}




export { getIndexPage,getAboutPage,getRegisterPage,getLoginPage}