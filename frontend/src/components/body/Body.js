import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'

import NotFound from '../utils/NotFound/NotFound'
import ForgotPassword from '../body/auth/ForgotPassword'
import ResetPassword from '../body/auth/ResetPassword'
import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'
import Home from '../Home'
import Super from '../Super'
import Panel from '../body/panel/Panel'
import PanelEdit from '../body/panel/PanelEdit'
import Panelexp from '../body/panel/Panelexp'
import CreateGroupAssign from './panel/CreateGroupAssign'
import GetAllAssignedGrups from './panel/GetAllAssignedGrups'
import AssignedtoMe from './panel/AssignedtoMe'
import AllUsers from './profile/AllUsers'

import CreateAssignment from '../assignment/CreateAssignment'
import GetAllAssignements from '../assignment/GetAllAssignments'
import EditAssignment from '../assignment/EditAssignment'
import UserCreatedAssignment from '../assignment/UserCreatedAssignment'
import StudentView from '../assignment/StudentView'

import CreateMarking from '../markings/CreateMarking'
import GetMarkings from '../markings/GetMarkings'

import CreateDownloads from '../downloads/CreateDownloads'
import GetDownloads from '../downloads/GetDownloads'


import StudentHome from '../Student/secHome'
import StudentsHome from '../Student/StudentHome'

import StdRegister from '../Student/register'
import STDLogin from '../Student/login'



import TestUsers from './TestUsers'

import Footer from "../header/Footer"


import CreateUploads from '../studentUploads/CreateUploads'
import GetAllUploads from '../studentUploads/GetAllUploads'
import UserUploads from '../studentUploads/userUploads'


import {useSelector} from 'react-redux'
import STDprofile from '../Student/stdprofile'
import StdActivation from '../Student/activemail'


import Supervisorlist from '../SupervisorSelection/Supervisorlist'
import RequestSupervisor from '../SupervisorSelection/RequestSupervisor'
import GetAllRequests from '../SupervisorSelection/GetAllRequests'
import RequestToMe from '../SupervisorSelection/RequestToMe'
import RequestByMe from '../SupervisorSelection/RequestByMe'
import RequestStatus from '../SupervisorSelection/RequsetStatus'

import CoSupervisorlist from '../CoSupervisorSelection/CoSupervisorlist'
import RequestCoSupervisor from '../CoSupervisorSelection/RequestCoSupervisor'
import CoGetAllRequests from '../CoSupervisorSelection/CoGetAllRequests'
import CoRequestByMe from '../CoSupervisorSelection/CoRequestByMe'
import CoRequestToMe from '../CoSupervisorSelection/CoRequestToMe'
import RequestStatusCo from '../CoSupervisorSelection/RequsetStatusCo'





import CreateChat from '../chat/CreateChat'
import ChatsToSupervisor from '../chat/ChatsToSupervisor'
import  CreateChatStudent from '../chat/CreateChatStudent'
import ChatsToStudent from '../chat/ChatsToStudent'
import ChatsStudents from '../chat/ChatsStudent'


import GetAllGroups from '../group/GetAllGroups'
import CreateGroup from '../group/CreateGroup'
import GetGroup from '../group/GetGroup'
import GetMyGroups from '../group/GetMyGroups'
import AssignGroupID from '../group/AssignGroupID'


import TopicRegistration from '../topics/TopicsRegistration'
import UserTopics from '../topics/UserTopics'
import GetAllTopics from '../topics/GetAllTopics'
import TopicStatus from '../topics/TopicStatus'

import Allstd from '../Student/allSTD'



export default function Body() {

const auth = useSelector(state => state.auth)
const {isLogged, isAdmin, isSuper,isCoSuper, isPanel,isSTD} = auth


  return (

      

    
    <section>
        <Switch>
            <Route path='/login' component={isLogged ? NotFound: Login} exact />
            <Route path='/register' component={isLogged ? NotFound: Register} exact/>
            <Route path='/forgot_password' component={isLogged ? NotFound: ForgotPassword} exact/>
            <Route path='/user/reset/:token' component={isLogged ? NotFound: ResetPassword} exact/>
            <Route path='/user/activate/:activation_token' component={ActivationEmail} exact/>
            <Route path='/profile' component={isLogged ? Profile: NotFound} exact/>
            <Route path='/edit_user/:id' component={isAdmin ? EditUser: NotFound} exact/>
            <Route path='/staffhome' component={isLogged ? Home: Login} exact/>
            <Route path='/super' component={isSuper || isAdmin || isCoSuper ? Super : NotFound} exact/>
            <Route path='/panel' component={isAdmin ? Panel : NotFound} exact/>
            <Route path='/panelexp' component={isAdmin ? Panelexp : NotFound} exact/>
            <Route path='/CreateGroupAssign/:id?/:name?' component={isAdmin ? CreateGroupAssign : NotFound} exact/>
            <Route path='/GetAllAssignedGrups' component={isAdmin ? GetAllAssignedGrups : NotFound} exact/>
            <Route path='/AssignedtoMe/:id' component={isPanel ? AssignedtoMe : NotFound} exact/>
            <Route path='/studentview' component={StudentView} exact/>
            <Route path='/allusers' component={isAdmin ? AllUsers : NotFound} exact/>

            <Route path='/student/active/:activetocken' component={StdActivation} exact/>

            <Route path='/panel_edit/:id' component={isAdmin ? PanelEdit : NotFound} exact/>


            <Route path='/createassi' component={isAdmin ? CreateAssignment : NotFound} exact/>
            <Route path='/getallassi' component={isSuper || isAdmin || isCoSuper || isPanel ? GetAllAssignements : NotFound} exact/>
            <Route path='/editassi/:id' component={isAdmin ? EditAssignment : NotFound} exact/>
            <Route path='/usercreated/:id' component={isAdmin ? UserCreatedAssignment : NotFound} exact/>

            <Route path='/createmarking' component={isAdmin ? CreateMarking : NotFound} exact/>
            <Route path='/getmarkings' component={isSuper || isAdmin || isCoSuper || isPanel  ? GetMarkings : NotFound} exact/>

            <Route path='/createdownloads' component={isAdmin ? CreateDownloads : NotFound} exact/>
            <Route path='/getdownloads' component={isAdmin ? GetDownloads : NotFound} exact/>


            <Route path='/Student-Home' component={StudentHome} exact />
            <Route path='/' component={isSTD? StudentHome : StudentsHome } exact />
            <Route path='/stdreg' component={ isSTD? StudentHome : StdRegister   } exact/>
            <Route path='/stdlogin' component={isSTD ? StudentHome: STDLogin } exact/>
            <Route path='/stdprofile' component={isSTD ? STDprofile: STDLogin} exact/>


            <Route path='/testusers' component={isAdmin ? TestUsers : NotFound} exact/>


            <Route path='/createuploads/:id?/:aid?/:createdid?/:studentno?' component={isSTD? CreateUploads : STDLogin} exact/>
            <Route path='/getuploads' component={isSuper || isAdmin || isCoSuper || isPanel  ? GetAllUploads : Login} exact/>
            <Route path='/useruploadedAssi/:id' component={isSTD? UserUploads : STDLogin} exact/>


            <Route path='/supervisorlist' component={isSTD || isAdmin ? Supervisorlist : STDLogin} exact/>
            <Route path='/requestsupervisor/:superid?/:supername?' component={ isSTD ? RequestSupervisor : STDLogin} exact/>
            <Route path='/getallrequests' component={isAdmin ? GetAllRequests : Login} exact/>
            <Route path='/requesttome/:id' component={isSuper? RequestToMe : Login} exact/>
            <Route path='/requestbyme/:id' component={isSTD ? RequestByMe : STDLogin} exact/>
            <Route path='/requeststatus/:id' component={isSuper ? RequestStatus : Login} exact/>


            <Route path='/cosupervisorlist' component={ isSTD || isAdmin ? CoSupervisorlist : STDLogin} exact/>
            <Route path='/requestcosupervisor/:superid?/:supername?' component={isSTD ? RequestCoSupervisor : STDLogin} exact/>
            <Route path='/cogetallrequests' component={isAdmin ? CoGetAllRequests : Login} exact/>
            <Route path='/corequestbyme/:id' component={isSTD  ? CoRequestByMe : STDLogin} exact/>
            <Route path='/corequesttome/:id' component={isCoSuper ? CoRequestToMe : Login} exact/>
            <Route path='/corequeststatus/:id' component={isCoSuper ? RequestStatusCo : Login} exact/>




            <Route path='/createchat/:studentid?/:studentname?' component={isSuper? CreateChat : Login } exact/>
            <Route path='/chats/:id?/:studentid?' component={isSuper? ChatsToSupervisor : Login} exact/>
            <Route path='/createchatstudent/:superid?/:supername?' component={isSTD ? CreateChatStudent : STDLogin} exact/>
            <Route path='/chatsstudent/:id' component={isSuper? ChatsToStudent : Login} exact/>
            <Route path='/chatsstudents/:id' component={isSTD ? ChatsStudents : STDLogin} exact/>
      

            <Route path='/getallgroups' component={isSuper || isAdmin || isCoSuper || isPanel  ? GetAllGroups : Login} exact/>
            <Route path='/creategroup' component={isSTD ? CreateGroup : STDLogin} exact/>
            <Route path='/groups/:id' component={isSTD? GetGroup : STDLogin} exact/>
            <Route path='/mygroups/:id' component={isSTD? GetMyGroups : STDLogin} exact/>
            <Route path='/assigngroupid/:id' component={isAdmin ? AssignGroupID : Login} exact/>


            <Route path='/topicreg' component={isSTD ? TopicRegistration : STDLogin} exact/>
            <Route path='/usertopics/:id' component={isSTD? UserTopics : STDLogin} exact/>
            <Route path='/getalltopics' component={isSuper || isAdmin || isCoSuper || isPanel ? GetAllTopics : Login} exact/>
            <Route path='/topicstatus/:id' component={isAdmin  || isPanel  ? TopicStatus : Login} exact/>


            <Route path='/stdall' component={Allstd} exact/>
            
             
        </Switch>


        <Footer />

    </section>

   
  
  )
}

