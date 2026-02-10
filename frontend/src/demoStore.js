import { createContext, useContext } from "react";

const DemoContext = createContext();

const STATUSES = ["todo", "progress", "done"];

const DEMO_TASKS = [
 "Design Login UI","JWT Authentication","API Integration","Kanban Board",
 "Pipeline Setup","Sprint Planning","Dashboard Layout","Docker Build",
 "Unit Testing","Role Based Access","Cloud Deployment","Code Review"
].map((t,i)=>({
 id:i+1,
 title:t,
 status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
 points:3,
 assignee:"Demo",
 demo:true
}));

export const demoProjects = [
 {id:1,name:"Website Redesign",demo:true},
 {id:2,name:"AI Analytics Platform",demo:true},
];

export const demoSprints = [
 {id:1001,name:"Sprint Alpha",project:1,tasks:DEMO_TASKS},
 {id:1002,name:"Sprint Beta",project:1,tasks:DEMO_TASKS},
 {id:1003,name:"Model Training",project:2,tasks:DEMO_TASKS},
 {id:1004,name:"Deployment Sprint",project:2,tasks:DEMO_TASKS},
];

export function DemoProvider({children}){
 return(
  <DemoContext.Provider value={{demoProjects,demoSprints}}>
   {children}
  </DemoContext.Provider>
 );
}

export const useDemo = () => useContext(DemoContext);
