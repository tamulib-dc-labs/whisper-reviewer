import { MediaFile } from "./types/media";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  fetch("./test_for_whisper_transcript_online.json")
    .then((response) => response.json())
    .then((mediaFiles: MediaFile[]) => {
      const dropdown = document.createElement("select");
      dropdown.id = "audio-dropdown";
      dropdown.className = "border border-gray-300 rounded-lg p-2 my-4 font-serif";

      function hasName(file: unknown): file is { name: string } {
  return !!file && typeof file === 'object' && 'name' in file;
}

    mediaFiles.forEach((file, index) => {
          if (hasName(file)) {
            const option = document.createElement("option");
            option.value = index.toString();
            option.textContent = file.name;
            dropdown.appendChild(option);
          } else {
            console.error("File is missing 'name' property:", file);
          }
    });

      document.body.appendChild(dropdown);

      let whisperElement = document.createElement("whisper-transcript");
      document.body.appendChild(whisperElement);

      const updateWhisperTranscript = (index: number) => {
        const selectedFile = mediaFiles[index];

        document.body.removeChild(whisperElement);

        whisperElement = document.createElement("whisper-transcript");
        whisperElement.setAttribute("audio", selectedFile.audio);
        whisperElement.setAttribute("url", selectedFile.url);

        document.body.appendChild(whisperElement);

      };

      dropdown.addEventListener("change", (event) => {
        const index = parseInt((event.target as HTMLSelectElement).value);
        updateWhisperTranscript(index);
      });

      updateWhisperTranscript(0); // Set the first item as default
    })
    .catch((error) => {
      console.error("Error loading media files:", error);
    });
});
