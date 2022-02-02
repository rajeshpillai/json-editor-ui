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

    
  }
  
  const re = function (d) {
    return (
      <li className="node-item" onClick={(e) => handleToggle(e, d)} 
          key={d.id}>
          { isObject(d) && 
            Object.keys(d).map(v => {
                return (
                  <div>
                     <span>{v}</span>: 
                    <span>
                    {
                      (isArray(d[v]) || isObject(d[v]))
                      ? <ul>{re(d[v])}</ul>
                      : (
                        <span>{d[v]}</span>
                      )
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
  }

  return (
    <ul>
     {
        isArray(data) && data.map(d => {
          return re(d);
        })
     }

     {
        isObject(data) && Object.keys(data).map(d => {

          console.log("d: ", d);
          console.log("isObject: ", isObject(d));
          
          return <><li>{d}<ul>{re(data[d])}</ul></li></>;
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