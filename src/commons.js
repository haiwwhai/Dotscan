// Our address for Alice on the dev chain
export const ALICE = '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDtZ';
export const BOB = '5Gw3s7q4QLkSWwknsiPtjujPv3XM4Trxi5d4PgKMMk3gfGTE';


//Creat wrapper with head to a div
export const createWrapper = (wrapperClass, headline,id_or_classname) => {
  const app = document.querySelector(id_or_classname);
  const div = document.createElement('div'); 
  if (id_or_classname=="#top_bar"){
    div.classList.add(wrapperClass);
  }else{
    div.classList.add('wrapper', wrapperClass);
    const head = document.createElement('h2');
    head.textContent = headline || wrapperClass;
    div.append(head);
  }    
  app.appendChild(div);
  return div;
};

export const createDiv = (wrapperClass,new_id,id_or_classname) => {
  const app = document.querySelector(id_or_classname);
  const div = document.createElement('div'); 
  div.classList.add(wrapperClass);
  div.id=new_id;
  app.appendChild(div);
  return div;
};
export const createBlockdetails = (wrapperClass, block_no, id_or_classname) => {
  const app = document.querySelector(id_or_classname);
  const div = document.createElement('div'); 
  div.classList.add(wrapperClass);
  div.id=block_no;
  if (app.length==0){
    app.appendChild(div);
  }
  else{
    app.insertBefore(div,app.childNodes[0]);
  }  
  return div;
};
export const createtext = (wrapperClass, id_or_classname,content) => {
  const app = document.querySelector(id_or_classname);
  const div = document.createElement('p'); 
  div.classList.add(wrapperClass);
  div.innerText = content;
  app.appendChild(div);
  return div;
};
export const createElement = (content, element = app, className) => {
    //console.log(content);
    const p = document.createElement('p');
    if (className) {
      p.classList.add(className);           }
    p.innerHTML = content;
    element.append(p);
};

 
export const createLog = (content, element = app, className) => {
  //console.log(content.replace('<br />', '\n'));
  const p = document.createElement('p');
  p.classList.add('detail_text');
  if (className) p.classList.add(className);
  p.innerHTML = content;
  
  if (element.id=='system_event')
    if(element.length==0){
      element.append(p);
    }
    else{
      element.insertBefore(p,element.childNodes[0]);
  }
  else{element.append(p);} 
};

export const createButton = (cb, element = app, text = 'Click me') => {
  const button = document.createElement('button');
  const callback = () => {
    console.log(`Button "${text}" clicked!`);
    cb();
  };

  button.innerHTML = text;
  element.appendChild(button);
  button.addEventListener('click', callback);
};

export const createError = (error, element = app) => {
  /*const textNode = error.type === undefined ? 'Undefined error while tying to fulfill request' : `Error of type ${error.name}:<br />${error.message}`;
  console.error(textNode.replace('<br />', '\n'));
  const p = document.createElement('p');
  p.classList.add('error');
  p.innerHTML = textNode;
  element.append(p);*/
};

export function clock_count()  {
    var date2=new Date();    //结束时间
    //var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数
    if (date2>=10000){
      var t=(date2/1000).toFixed(0);
    }
    else{
      var t=(date2/1000).toFixed(1);
    }        
    return t;
};