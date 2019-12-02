import React, {Component} from 'react';

import './Services.scss'

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
class Services extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services:[]
        };
      }

    componentDidMount = ()=>{
        let parentArray = this.props.services.filter(service=>{
            return service.ancestor_id == null;
        });
        for(let i=0;i<parentArray.length;i++){
            parentArray[i].children =[];
            parentArray[i].children = this.props.services.filter(service=>{
                return service.ancestor_id === parentArray[i].id;
            });
        }
        console.log(parentArray);
        this.setState({services:parentArray})
    }

    parentDashed = (children) =>{
        console.log(children);
        let serviable = children.filter(service=>{
            return service.staff_ids.includes(this.props.selectedStaff)
        });
        console.log(serviable)
        if(this.props.selectedStaff!=''){
            if(serviable.length>0){
                return 'serviceable';
            }else{
                return 'not-serviceable';
            }
        }
        

    }


    
    checkStaffServicability = (staff_ids)=>{
        if(staff_ids.includes(this.props.selectedStaff)){
            console.log('1');
            return 'serviceable';
        }else{
            console.log('2');
            return 'not-serviceable';
        }
    }


    
    render(){
        const {services} = this.state;
        return(
            <div className="service-section">
                <h4>Services :</h4>
                <Accordion>
                {services&& services.length>0 &&
                services.map(service=>{
                return (
                    <div className="services-container">
                        <AccordionItem>
                                <AccordionItemHeading>
                                <AccordionItemButton>
                                <span className={this.parentDashed(service.children)}>{service.name}</span>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                        {service && service.children && service.children.length>0 &&
                            service.children.map(childservices=>{
                                return (
                                    <div className={this.checkStaffServicability(childservices.staff_ids)}>
                                        <span className="child-name"> {childservices.name}</span>
                                        <span>{childservices.cost}</span>
                                    </div>
                                )
                            })
                        }
                        </AccordionItemPanel>
                        </AccordionItem>
                    </div>
                    )
                })
                
                }
                </Accordion>
            </div>
        ) 
    }
}

export default Services;