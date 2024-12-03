import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { Plus, WalletCards } from "lucide-react";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import addnoteimg from "../../assets/add-note.svg";
import nothing from "../../assets/nothing.png"

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    date: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type:"add",
    Message:"x"
  })

  const [isSearch,setIsSearch] = useState(false)
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleEdit = async (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };


  const handleCloseToast = () =>{
    setShowToastMsg({
      isShown:false,
      Message:""
    })
  }
  const showToastMessage = (message,type) =>{
    setShowToastMsg({
      isShown:true,
      Message:message,
      type
    })
  }


  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.data === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get ALL notes API
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error Occurred");
    }
  };


  const deleteNote =  async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${data._id}`);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted SuccessFully", 'delete')
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("Error Occured");
        
      }
    }
  }

//Search API
const onSearchNote = async (query) => {
  try {
    const response = await axiosInstance.get("/search-notes", {
      params:{query}
    })

    if (response.data && response.data.notes) {
      setIsSearch(true)
      setAllNotes(response.data.notes)
    }
  } catch (error) {
    console.log(error)
  }
}


const updateIsPinned = async (noteData) => {
  try {
    const response = await axiosInstance.put(`/update-note-pinned/${noteData._id}`, {
      isPinned: !noteData.isPinned
    });
    if (response.data && response.data.note) {
      showToastMessage( "Note Updated SuccessFully")
      getAllNotes();
      }
  } catch (error) {
   console.log(error);
   
  }
}

const handleClearSearch = () => {
  setIsSearch(false)
  getAllNotes();
}


  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
      <div className="container mx-auto">
        {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={moment(item.createdOn).format("Do MMM YYYY")}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => {
                handleEdit(item);
              }}
              onDelete={() => deleteNote(item)}
              onPinNote={() => updateIsPinned(item)}
            />
          ))}
        </div> : <EmptyCard imgSrc={isSearch? nothing :addnoteimg} message={isSearch? "Nothing Found" : "Start Creating Your First Note!, Click The 'ADD' to add new note."}/>}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#be95c4] hover:shadow-2xl absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", date: null });
        }}
      >
        <Plus className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColour: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-sm mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", date: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast 
      isShown={showToastMsg.isShown}
      message={showToastMsg.Message}
      type={showToastMsg.type}
      onClose={handleCloseToast}/>
    </>
  );
}

export default Home;
