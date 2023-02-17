
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



export { getIndexPage,getAboutPage}