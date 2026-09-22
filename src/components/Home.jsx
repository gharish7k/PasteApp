import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

const Home = () => {

  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")

  const [searchParams, setSearchParams] = useSearchParams()

  const pasteId = searchParams.get("pasteId")

  const dispatch = useDispatch()

  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {

    if (pasteId) {

      const paste = allPastes.find(
        (p) => p._id === pasteId
      )

      if (paste) {
        setTitle(paste.title)
        setValue(paste.content)
      }

    }

  }, [pasteId, allPastes])

  function createPaste() {

    if (!title.trim()) {
      toast.error("Please enter a title")
      return
    }

    if (!value.trim()) {
      toast.error("Please enter some content")
      return
    }

    const paste = {
      title: title.trim(),
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {

      dispatch(updateToPastes(paste))

    } else {

      const duplicate = allPastes.some(
        (item) =>
          item.title.trim().toLowerCase() ===
            title.trim().toLowerCase() &&
          item.content.trim() === value.trim()
      )

      if (duplicate) {
        toast.error("Same paste already exists!")
        return
      }

      dispatch(addToPastes(paste))
    }

    setTitle("")
    setValue("")
    setSearchParams({})
  }

  function copyContent() {

    if (!value) {
      toast.error("Nothing to copy")
      return
    }

    navigator.clipboard.writeText(value)

    toast.success("Copied to Clipboard")
  }

  return (
    <div className="mx-auto w-full max-w-[1126px] px-6 py-8">

      {/* Title + Button */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-[75%]"
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>

      </div>


      {/* Editor */}

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">

        {/* Browser-like header */}

        <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">

          <div className="flex gap-2">

            <span className="h-3 w-3 rounded-full bg-red-500"></span>

            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>

            <span className="h-3 w-3 rounded-full bg-green-500"></span>

          </div>

          <button
            onClick={copyContent}
            className="rounded-md p-1 text-gray-600 transition hover:bg-gray-100 hover:text-black"
            title="Copy content"
          >
            <Copy size={20} />
          </button>

        </div>

        <textarea
          className="min-h-[480px] w-full resize-y p-4 text-gray-800 outline-none"
          value={value}
          placeholder="Write Your Content Here...."
          onChange={(e) => setValue(e.target.value)}
        />

      </div>

    </div>
  )
}

export default Home