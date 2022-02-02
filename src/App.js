import * as React from 'react';
import Tree from './components/tree';
// import './base.css';
// import './App.css';

console.clear();

let menu_data = [
  {
    id: "1",
    title: "menu 1",
    children :[
      { id: "2", parent_id: "1", title: "menu 1.1", content: "Content 1"},
      { 
        id: "3",
        parent_id: "1",
        title: "menu 1.2",
        children: [
          {id: "4", parent_id: "3", title: "menu 1.2.1", content: "Content 2"},
          {id: "5", parent_id: "3", title: "menu 1.2.2", content: "Content 3"},          
        ]
      },
    ]
  },
  {
    id: "6",
    title: "menu 2",
    children :[
      { id: "7", parent_id: "6", title: "menu 2.1", content: "Content 4"},
      { id: "8", parent_id: "6", title: "menu 2.2", content: "Content 5"},
    ]
  } 
]


function App() {
  const [menu, setMenu] = React.useState(menu_data);
  const [content, setContent] = React.useState("");
  
  const onLoadContent = (content) => {
    setContent(content);
  }
  return (
    <div className="container">
      <h4 class="text-2xl text-left">TreeView Component</h4>
      <div className="app">
        <div className="tree shadow">
          <Tree 
            data={menu} 
            isChild={false} 
            onLoadContent={onLoadContent} />      
        </div>
        <div className="content shadow">
            {content}
        </div>
      </div>
    
    </div>
  )
}

export default App;