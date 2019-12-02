import React, { Component } from 'react';
import moment from 'moment-timezone';
import './Location.scss'


import Services from '../../components/Services/Services';

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLocation:{},
            selectedOption:this.props.locations[0].id,
            selectedStaff:''
        };
    }

    componentDidMount = () => {

    }
    
    locationChanged = (location)=>{
        this.setState({
            selectedLocation:location,
            selectedOption:location.id
        });
    }

    userLocatedinSelectedLocation = (locations)=>{
        if(locations.includes(this.state.selectedOption)){
            console.log('1');
            return 'employe-exist';
        }else{
            console.log('2');
            return 'employe-doesexist';
        }
    }

    getCurrentTimeofZone =(timeZone)=>{
        return moment.tz(timeZone).format("HH:mm:ss A");
    } 

    filterService = (staffid) =>{
        this.setState({...this.state,selectedStaff:staffid})
        console.log(staffid,this.state);
    }

    render() {
        const { locations,staffs,services } = this.props;
        const {selectedOption,selectedStaff} = this.state;
        return (
            <div>
            <div className="location-employee">
                {locations &&
                    <div className="location">
                        {locations.map(item => {
                            return (<div key={item.id} className="location-data">
                                    <input type="radio" name="location" 
                                        value={item.id} 
                                        checked={item.id===selectedOption} 
                                        onChange={()=>this.locationChanged(item)}
                                    />
                                    <div>
                                        <div>{item.name}</div>
                                        <div>{item.address}</div>
                                        <div>{this.getCurrentTimeofZone(item.zone.zone)}</div>
                                    </div>
                                   
                            </div>)
                        })}
                    </div>
                }
                {staffs &&
                    <div className="employee">
                        {
                            staffs.map(staff=>{
                                return <div className={this.userLocatedinSelectedLocation(staff.locations)} onClick={()=>this.filterService(staff.id)}>{staff.name}</div>
                            })
                        }
                    </div>
                }
                {

                }
               
            </div>
            <Services services={services} selectedStaff={selectedStaff}/>
            </div>
        )
    }
}

export default Location;