import * as React from 'react'

export default function Tree({data=[], isChild = false, onLoadContent}) {
  const [state, setState] = React.useState([]);
  
  const handleToggle = (e, d) => {
    e.stopPropagation();
    
    let us = [];

    if (state.includes(d.id)) {
      us = state.filter(ps => ps != d.id);
    } else {
      us = [...state, d.id]
    }

    setState(us);

    console.log(us);  
    
    // if parent_id is not undefined, means leaf/content node is clicked
    if (d.parent_id !== undefined) {
      // You can customize the logic like load content lazily etc.
      onLoadContent(d.content)
    }
  }
  
  return (
    <ul>
     {
        data.map(d => {
          let expanded = d.children && !state.includes(d.id);


          console.log("d: ", d);
          console.log("isObject: ", isObject(d));

          return (
            <li onClick={(e) => handleToggle(e, d)} 
              key={d.id}>
              {d.children && <button>{expanded ? "-" : "+"}</button>}
              { isObject(d) && 
                Object.keys(d).map(v => {
                    return (
                      <div>
                        <span>{v}</span>:
                        <span>
                        {
                          isArray(d[v]) 
                          ? <Tree 
                              data={d[v]} 
                              isChild={true} 
                              onLoadContent={onLoadContent} />
                          : d[v].toString()
                        }
                        </span>
                      </div>
                    )
                })
              }

              {!isObject(d) &&
                <div>{d}</div>
              }
              
            </li>
          )
        })
     }
   </ul>
  )
}

function isArray(attrVal) {
  return Array.isArray(attrVal);
}

function isObject(obj) {
  return obj === Object(obj);
}