import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

export default function StudentsHome() {

    
    const images = [
        { url: "https://www.sliit.lk/wp-content/uploads/2018/04/Home-Slider-1.jpg" },
        { url: "https://static.sliit.lk/wp-content/uploads/2017/11/Sliit-Research-Facilities.jpg" },
        { url: "https://www.sliit.lk/wp-content/uploads/2017/11/Slider-Background.jpg" },
        
      ];


  return (
    <div>
        <p className="mt-3 mb-4" >SLIIT ResearchDesk</p>

        <div className="mt-3" style={{borderRadius:"100x"}}>
      <SimpleImageSlider
      
        width={1190}
        height={400}
        images={images}
        showBullets={true}
        showNavs={true}
        slideDuration={0.8}
        autoPlay={true}
      />
    </div>


    <h1 className="text-center p-1 pb-2"  style={{color: 'white',backgroundColor:'#C23A34' }}>Welcome to SLIIT</h1>

<div className="row mt-3">
    <div className="col-md-4" >
    <img src={'https://courseweb.sliit.lk/pluginfile.php/2/course/section/2/your-path-to-greadness-starts-here.png'} alt=""
    style={{ width:"400px", height:"150px"}}/>
    </div>
    <div className="col-md-8"  >
    <p className="p-2 mt-3" style={{backgroundColor:"#F4F4F4"}}>
        We are a leading non-state degree awarding institute approved by the University Grants Commission (UGC) under the Universities Act. We are also members of the Association of Commonwealth Universities (ACU), as well as the International Association of Universities (IAU), and the first Sri Lankan institute to be accredited by the Institution of Engineering & Technology, UK.

We are proud to be listed as a leading and formidable awarding institute authorised and approved by the University Grants Commission (UGC) under the Universities Act, and the International Association of Universities (IAU). Furthermore, not only are we the first Sri Lankan institute to be accredited by the Institution of Engineering & Technology (IET.), UK, our IT degrees are also in turn accredited by the Engineering Council, UK.


    </p>
    </div>
<div className="row mb-3">
    <div className="col">
<div class="cars">
  <div class="car">

    <img src="https://static.sliit.lk/wp-content/uploads/2017/10/sliit-research-computing-faculty-1.jpg" alt=""  style={{width:"290px"}}/>
    <h2 className="text-center p-2"  style={{color: 'white',backgroundColor:'#38B9EC' }}>Computing</h2>
    <p class="car-desc" style={{color: 'white'}}>
    SLIIT Faculty of Computing
    <hr/>
    The SLIIT Faculty of Computing is equipped with a range of courses specialising in various arms of the IT sector.   
 </p>
  </div>
  </div>
 
    </div>

    <div className="col">
<div class="cars">
  <div class="car">

    <img src="https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.ft.lk/ftadmin/wp-content/uploads/2016/10/25205753/Untitled-4152.jpg" alt=""  style={{width:"290px"}}/>
    <h2 className="text-center p-2"  style={{color: 'white',backgroundColor:'#F1592A' }}>Business</h2>
    <p class="car-desc" style={{color: 'white'}}>
    SLIIT Faculty of Business
    <hr/>
    The Faculty of Business within SLIIT continues to rise up to the challenge of nurturing leaders, managers and IS professionals that can make decisions and implement actions that are right for themselves, right for their </p>
  </div>
  </div>
 
    </div>
    

    <div className="col">
<div class="cars">
  <div class="car">

    <img src="https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.dailymirror.lk/assets/uploads/image_485b128ebc.jpg" alt="" style={{width:"290px"}} />
    <h2 className="text-center p-2"  style={{color: 'white',backgroundColor:'#8EC63F' }}>Engineering</h2>
    <p class="car-desc" style={{color: 'white'}}>
    SLIIT Faculty of Engineering
    <hr/>
    The Faculty of Engineering of Sri Lanka Institute of Information technology is the epicenter of engineering education, research, knowledge creation and distribution in Sri Lanka.    </p>
  </div>
  </div>
 
    </div>

    
    
    


    </div>
    
    

    </div>
    </div>
  )
}
