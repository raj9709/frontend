import { Pencil, PinIcon, Trash2 } from "lucide-react";
import React from "react";

function NoteCard({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) {
  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-2xl transition-transform transform hover:scale-105 ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-bold">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <PinIcon
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item, index) => (
            <span key={index} className="mr-1">#{item}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Pencil className="icon-btn hover:text-green-600" onClick={onEdit} />
          <Trash2 className="icon-btn hover:text-red-600" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
