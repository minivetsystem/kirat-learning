function InsertTableButton() {
  const [editor] = useLexicalComposerContext();

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: 3,
      rows: 3,
    });
  };

  return (
    <button
      onClick={insertTable}
      className="mb-2 rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
    >
      ➕ Insert Table
    </button>
  );
}

export default InsertTableButton