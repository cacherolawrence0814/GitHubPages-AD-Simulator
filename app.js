let data=JSON.parse(localStorage.getItem("ad")||'{"domain":"test.local","OUs":[],"Users":[],"Groups":[],"Computers":[]}');function save(){localStorage.setItem("ad",JSON.stringify(data));render()}function addObject(){const n=document.getElementById("name").value;const t=document.getElementById("type").value;if(!n)return;if(t==='OU')data.OUs.push(n);if(t==='User')data.Users.push(n);if(t==='Group')data.Groups.push(n);if(t==='Computer')data.Computers.push(n);save()}function render(){document.getElementById('tree').textContent=JSON.stringify(data,null,2);const directory=document.getElementById('directory');directory.replaceChildren();const objects=[['Domain',data.domain],...['OUs','Users','Groups','Computers'].flatMap(type=>data[type].map(name=>[type.slice(0,-1),name]))];objects.forEach(([type,name])=>{
    const row=document.createElement('tr');
    const typeCell=document.createElement('td');
    const nameCell=document.createElement('td');
    typeCell.textContent=type;
    nameCell.textContent=name;
    row.append(typeCell,nameCell);
    directory.append(row);
  });let ps='';data.OUs.forEach(x=>ps+=`New-ADOrganizationalUnit -Name "${x}"
`);data.Users.forEach(x=>ps+=`New-ADUser -Name "${x}"
`);document.getElementById('ps').textContent=ps;}function exportJson(){const b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='ad.json';a.click()}document.getElementById('importFile').addEventListener('change',e=>{const f=e.target.files[0];const r=new FileReader();r.onload=()=>{data=JSON.parse(r.result);save()};r.readAsText(f)});render();