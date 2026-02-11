import { useEffect,useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://realtimenotesapp-production.up.railway.app");

export default function Editor({ note, token }) {

  const [content,setContent]=useState("");
  const [title,setTitle]=useState("");

  // ✅ Sync when note changes
  useEffect(()=>{
    setContent(note.content || "");
    setTitle(note.title || "");

    socket.emit("join-note",note.id);

    socket.on("receive-update",(data)=>{
      setContent(data);
    });

    return ()=>socket.off("receive-update");
  },[note]);

  // ✅ Update note
  const update=async(newContent,newTitle)=>{
    setContent(newContent);
    setTitle(newTitle);

    socket.emit("note-update",{
      noteId:note.id,
      content:newContent
    });

    await axios.put(
      `https://realtimenotesapp-production.up.railway.app/notes/${note.id}`,
      {title:newTitle,content:newContent},
      {headers:{Authorization:`Bearer ${token}`}}
    );
  };

  return (
    <div>
      {/* ✏️ Editable Title */}
      <input
        className="text-2xl font-bold mb-3 w-full border p-2"
        value={title}
        onChange={e=>update(content,e.target.value)}
      />

      {/* 📝 Content */}
      <textarea
        className="w-full h-[75vh] border p-4"
        value={content}
        onChange={e=>update(e.target.value,title)}
      />
    </div>
  );
}
