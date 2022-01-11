import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import PageError from "../../components/Error/PageError";
import { Image, PageContainer } from "../../components/GlobalStyles/PageStyles";
import PageLoader from "../../components/Loaders/PageLoader";
import { GET_HOTEL_BY_ID } from "../../graphql/queries/hotelQueries";
import { GlobalContext } from "../../utils/Context";
import HotelDetails from "./HotelDetails";


const Hotel = () => {
    const {setPage} = useContext(GlobalContext)
    const { id } = useParams();
    const location = useLocation()
    const { data, loading, error } = useQuery(GET_HOTEL_BY_ID, {
        variables: { id: id },
    });
    
    useEffect(() => {
        if(!loading && data){
            setPage(`${data.getHotelByID.name}`)
        }
        
    }, [loading, data])

    if (loading) return <PageLoader />
    if (error) return <PageError error={error} />

    const hotel = data.getHotelByID;

    return (
        <PageContainer style={{maxWidth: "1200px", marginLeft: "auto", marginRight: "auto"}}>
            <HotelDetails hotel={hotel} params={location.state}/>
        </PageContainer>
    );
};

export default Hotel;
