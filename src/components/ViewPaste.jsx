import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Copy, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const ViewPaste = () => {

  const { id } = useParams()

  const allPastes = useSelector(
    (state) => state.paste.pastes
  )

  const paste = allPastes.find(
    (p) => p._id === id
  )

  function handleCopy() {

    navigator.clipboard.writeText(paste.content)

    toast.success("Copied to Clipboard")
  }

  if (!paste) {

    return (
      <div className="mx-auto max-w-[1126px] px-6 py-20 text-center">

        <h1 className="text-3xl font-bold">
          Paste Not Found
        </h1>

        <Link
          to="/pastes"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          <ArrowLeft size={18} />
          Back to Pastes
        </Link>

      </div>
    )

  }

  return (
    <div className="mx-auto w-full max-w-[1126px] px-6 py-8">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <input
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none sm:w-[75%]"
          type="text"
          value={paste.title}
          disabled
        />

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Copy size={18} />
          Copy
        </button>

      </div>


      <div className="mt-6 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">

          <div className="flex gap-2">

            <span className="h-3 w-3 rounded-full bg-red-500"></span>

            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>

            <span className="h-3 w-3 rounded-full bg-green-500"></span>

          </div>

          <button
            onClick={handleCopy}
            className="rounded-md p-1 text-gray-600 hover:bg-gray-100"
            title="Copy content"
          >
            <Copy size={20} />
          </button>

        </div>

        <textarea
          className="min-h-[480px] w-full resize-y p-4 text-gray-800 outline-none"
          value={paste.content}
          disabled
        />

      </div>

    </div>
  )
}

export default ViewPaste