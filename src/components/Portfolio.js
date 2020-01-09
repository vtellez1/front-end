import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { fetchChefInfo, fetchChefsRecipes} from "../store/actions";

import RecipeCard from "./RecipeCard";
import ChefInfoCard from './ChefInfoCard';

const Portfolio = ({ fetchChefInfo, fetchChefsRecipes, chefinfo, chefrecipes }) => {

    const { id } = useParams();


    useEffect(() => {
        const recipe_id = id ? id : 1
        fetchChefInfo();
        fetchChefsRecipes(recipe_id);
      }, [id]);

    return(
        <div>
            <h1>This Chef's Portfolio: </h1>
           
            <p>{chefinfo && chefinfo.filter(chefinfo => {
                
                console.log("chefinfoid", chefinfo.id);
                console.log("id", id);
                
                if (chefinfo.id === id)
                {
                return(
                <ChefInfoCard chefinfo={chefinfo}/>)
                    }}
                )}</p>

            <p>{chefrecipes && chefrecipes.map(recipe => (
                <RecipeCard recipe={recipe} />
                ))}</p>
        </div>
    )
};
const mapStateToProps = state => {
    return {
        chefrecipes: state.chefrecipes,
      chefinfo: state.chefinfo,
      isFetching: state.isFetching,
      error: state.error
    };
  };
  
export default connect(mapStateToProps, { fetchChefInfo, fetchChefsRecipes })(Portfolio);
