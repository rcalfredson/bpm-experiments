import RealTimeBPMAnalyzer from 'realtime-bpm-analyzer';

class BeatAnalyzer {
  static findBeat(audioElement) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioElement);
    const scriptProcessorNode = audioContext.createScriptProcessor(4096, 1, 1);
    scriptProcessorNode.connect(audioContext.destination);
    source.connect(scriptProcessorNode);
    source.connect(audioContext.destination);

    const onAudioProcess = new RealTimeBPMAnalyzer({
      scriptNode: {
          bufferSize: 4096,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1
      },
      pushTime: 2000,
      pushCallback: (err, bpm) => {
          console.log('bpm', bpm);
      }
  });
  // Attach realTime function to audioprocess event.inputBuffer (AudioBuffer)
  scriptProcessorNode.onaudioprocess = (e) => {
      onAudioProcess.analyze(e);
  };
  }
}

export default BeatAnalyzer;