
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



export { getIndexPage,getAboutPage,getRegisterPage}