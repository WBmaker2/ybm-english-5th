export function createDrawSoundPlayer() {
  let audioContext = null;

  function getAudioContext() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    return audioContext;
  }

  return function playDrawSound() {
    const context = getAudioContext();

    if (!context) {
      return;
    }

    const start = context.currentTime;
    const master = context.createGain();

    master.gain.setValueAtTime(0.0001, start);
    master.gain.exponentialRampToValueAtTime(0.22, start + 0.03);
    master.gain.exponentialRampToValueAtTime(0.0001, start + 0.85);
    master.connect(context.destination);

    const lowTone = context.createOscillator();
    const highTone = context.createOscillator();
    const shimmer = context.createOscillator();

    lowTone.type = "triangle";
    highTone.type = "sine";
    shimmer.type = "sine";

    lowTone.frequency.setValueAtTime(523.25, start);
    lowTone.frequency.exponentialRampToValueAtTime(392, start + 0.85);

    highTone.frequency.setValueAtTime(783.99, start);
    highTone.frequency.exponentialRampToValueAtTime(659.25, start + 0.7);

    shimmer.frequency.setValueAtTime(1046.5, start + 0.02);
    shimmer.frequency.exponentialRampToValueAtTime(880, start + 0.45);

    const shimmerGain = context.createGain();
    shimmerGain.gain.setValueAtTime(0.0001, start);
    shimmerGain.gain.exponentialRampToValueAtTime(0.08, start + 0.04);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

    lowTone.connect(master);
    highTone.connect(master);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(master);

    lowTone.start(start);
    highTone.start(start);
    shimmer.start(start + 0.02);

    lowTone.stop(start + 0.86);
    highTone.stop(start + 0.76);
    shimmer.stop(start + 0.36);
  };
}
