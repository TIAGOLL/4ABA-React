
import { NavLink } from 'react-router-dom';
import SideBar from '../../components/SideBar/index';
import { useParams } from "react-router-dom";
const Dashboard = () => {

  const params = useParams()
  console.log(params)

  return <>
    <SideBar params={params} />
    <NavLink to={'/dashboard'} className={'bg-zinc-900'} activeClassName="bg-red-500">sdfafs</NavLink>
  </>
}

export default Dashboard;