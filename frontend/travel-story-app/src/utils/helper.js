import NO_STORY from "../assets/images/fileSearch.svg";
import SEARCH_DATE from "../assets/images/dateSearch.svg";
import ADD_STORY from "../assets/images/addFile.svg";

export const validateEmail =(email) =>{
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials=(name)=>{
    if(!name)return "";

    const words=name.split("");
    let initials="";
    for(let i=0;i<Math.min(words.length,2);i++){
        initials+=words[i][0];
    }
    return initials.toUpperCase();
};
export const getEmptyCardMessage=(filterType)=>{
    switch(filterType){
        case"Search":
        return `Oops! No story found matching your search`;

        case"date":
        return `No story found in the given date range`;

        default:
            return `Start creating your first Travel Story! Click the'Add' button to join down your thoughts,ideas and memories.Let's get started!`;
    }
};

export const getEmptyCardImg=(filterType)=>{
    switch(filterType){
        case"Search":
        return NO_STORY;

        case"date":
        return SEARCH_DATE;

        default:
            return ADD_STORY;
    }
};