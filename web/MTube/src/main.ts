import './style.css'

// console.log('ttt');

// id Int @id @default(autoincrement())
//   title String @unique
//   description String?
//   mediaPath String
//   status Boolean @default(false)
//   userId Int


interface video{

    id:number,
    title:string,
    description:string | null,
    mediaPath:string,
    status:boolean,
    userId:number

}


function buildVideoCard(_video:video):string{

    return `
                <div class="space-y-3 w-full">
                    <div class="w-full bg-red-600 rounded-lg">
                        <video src="http://localhost:3000/videos/stream/${_video.id}" controls></video>
                    </div>
                    <div class="flex space-x-2">
                        <div>
                            <img src="./assets/logo.png" class="w-10 h-10 rounded-full bg-red-600" alt="">
                        </div>
                        <div class="flex flex-col">
                            <span class="font-semibold w-[200px]">${_video.title}</span>
                            <span class="text-gray-500">landri. </span>
                            <span class="text-gray-500">355 vues il y a 23 minutes</span>
                        </div>
                    </div>
                </div>
    `;
}

function buildVideosCard(_videos:video[]):string{

    let html:string="";

    for(const video of _videos){
        html+=buildVideoCard(video);
    }

    return html;
}
function injectVideosCard(_videos:video[]):void{
    const list_video=document.getElementById("list_video");

    if( list_video !== null){
        list_video.innerHTML=buildVideosCard(_videos);
    }
    
}


try {
    const response= await fetch('http://localhost:3000/videos/')
    console.log(response);
    if(response.status===200){

        console.log("success");
        
        const videos:video[]=await response.json();

        console.log(videos);

        injectVideosCard(videos)

    }else if(response.status==500){
        console.log("errors");
        
    }
            
    
} catch (error) {
    console.log(error);
    
}