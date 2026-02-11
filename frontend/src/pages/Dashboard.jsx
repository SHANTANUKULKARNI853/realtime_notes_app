import axios from "axios";
import { useEffect,useState } from "react";
import Editor from "./Editor";

export default function Dashboard({ token }) {
  const [notes,setNotes]=useState([]);
  const [selected,setSelected]=useState(null);

  const fetchNotes=async()=>{
    const res=await axios.get(
      "realtimenotesapp-production.up.railway.app/notes",
      {headers:{Authorization:`Bearer ${token}`}}
    );
    setNotes(res.data);
  };

  useEffect(()=>{fetchNotes()},[]);

  // ✅ CREATE NOTE
  const createNote=async()=>{
    const res=await axios.post(
      "realtimenotesapp-production.up.railway.app/notes",
      {
        title:"Untitled Note",
        content:"Start writing..."
      },
      {headers:{Authorization:`Bearer ${token}`}}
    );

    fetchNotes();
    setSelected(res.data);
  };

  const logout=()=>{
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-4">
        <h2 className="text-xl mb-4">My Notes</h2>

        {/* ➕ New Note Button */}
        <button
          onClick={createNote}
          className="bg-blue-500 w-full py-2 mb-4 rounded"
        >
          + New Note
        </button>

        {notes.map(n=>(
          <div
            key={n.id}
            onClick={()=>setSelected(n)}
            className="p-2 bg-gray-700 mb-2 cursor-pointer rounded"
          >
            {n.title}
          </div>
        ))}

        <button
          onClick={logout}
          className="mt-4 bg-red-500 w-full py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6">
        {selected ? (
          <Editor note={selected} token={token}/>
        ) : (
          <h2>Select or create a note</h2>
        )}
      </div>
    </div>
  );
}
