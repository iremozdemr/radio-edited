// PlanetViewer.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ModelViewer from './ModelViewers';
import '../css/PlanetViewer.css';
import LeftRightButton from './LeftRightButton';
import leftIcon from "../../public/leftIcon.png";
import rightIcon from "../../public/rightIcon.png";
import Calendar from './Calendar';
import Chatbox from './Chatbox'; 

const planetModels = {
  earth: '/models/earth.glb',
  jupiter: '/models/jupiter.glb',
  mars: '/models/mars.glb',
  mercury: '/models/mercury.glb',
  neptune: '/models/neptune.glb',
  pluto: '/models/pluto.glb',
  saturn: '/models/saturn.glb',
  uranus: '/models/uranus.glb',
  venus: '/models/venus.glb',
};

const planetInfo = {
  earth: {
    name: "Earth",
    namesake: "VARIATION OF THE GROUND IN MANY LANGUAGES",
    description: "Earth — our home planet is the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
    yearLength: "365.25",
    distanceFromSun: "1",
    moons: "1",
  },
  jupiter: {
    name: "Jupiter",
    namesake: "KING OF THE ROMAN GODS",
    description: "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.",
    yearLength: "11.86",
    distanceFromSun: "5.2",
    moons: "79",
  },
  mars: {
    name: "Mars",
    namesake: "ROMAN GOD OF WAR",
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.",
    yearLength: "1.88",
    distanceFromSun: "1.5",
    moons: "2",
  },
  mercury: {
    name: "Mercury",
    namesake: "ROMAN GOD OF SPEED",
    description: "Mercury—the smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.",
    yearLength: "88",
    distanceFromSun: "0.4",
    moons: "0",
  },
  neptune: {
    name: "Neptune",
    namesake: "ROMAN GOD OF THE SEA",
    description: "Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope.",
    yearLength: "164.81",
    distanceFromSun: "30.1",
    moons: "14",
  },
  pluto: {
    name: "Pluto",
    namesake: "ROMAN GOD OF THE UNDERWORLD",
    description: "Pluto is a complex world of ice mountains and frozen plains. Once considered the ninth planet, Pluto is the largest member of the Kuiper Belt and the best known of a new class of worlds called dwarf planets.",
    yearLength: "248.89",
    distanceFromSun: "39",
    moons: "5",
  },
  saturn: {
    name: "Saturn",
    namesake: "FATHER OF JUPITER",
    description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
    yearLength: "29.45",
    distanceFromSun: "9.5",
    moons: "62",
  },
  uranus: {
    name: "Uranus",
    namesake: "GREEK GOD OF THE SKY",
    description: "Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
    yearLength: "84",
    distanceFromSun: "19.8",
    moons: "27",
  },
  venus: {
    name: "Venus",
    namesake: "ROMAN GODDESS OF LOVE",
    description: "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
    yearLength: "225",
    distanceFromSun: "0.7",
    moons: "0",
  }
  // Add similar info for other planets...
};

const PlanetViewer = () => {
  const location = useLocation();
  const { planet } = location.state || { planet: 'earth' };

  const [currentPlanet, setCurrentPlanet] = useState(planet);
  const [isAnimating, setIsAnimating] = useState(false);

  const [showCustomDiv, setShowCustomDiv] = useState(false); // New state for checkbox

  const handlePlanetChange = (nextPlanet) => {
    setIsAnimating(false);
    setTimeout(() => {
      setCurrentPlanet(nextPlanet);
      setIsAnimating(true);
    }, 50);
  };

  const handleNextPlanet = () => {
    const planetNames = Object.keys(planetModels);
    const currentIndex = planetNames.indexOf(currentPlanet);
    const nextIndex = (currentIndex + 1) % planetNames.length;
    handlePlanetChange(planetNames[nextIndex]);
  };

  const handlePrevPlanet = () => {
    const planetNames = Object.keys(planetModels);
    const currentIndex = planetNames.indexOf(currentPlanet);
    const prevIndex = (currentIndex - 1 + planetNames.length) % planetNames.length;
    handlePlanetChange(planetNames[prevIndex]);
  };

  const { name, namesake, description, yearLength, distanceFromSun, moons } = planetInfo[currentPlanet];

  // Görev yönetimi durumları
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const completedTasksCount = tasks.filter(task => task.completed).length;

  useEffect(() => {
    console.log(`Planet Viewer yüklendi: ${currentPlanet}`);
  }, [currentPlanet]);

  // Yeni görev ekleme işlevi
  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  // Görev kaldırma işlevi
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Görevi tamamlanmış olarak işaretleme işlevi
  const toggleTask = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handler for checkbox change
  const handleCheckboxChange = () => {
    setShowCustomDiv(!showCustomDiv);
  };

  return (
    <>
      {/* Checkbox Container */}
      <div className="checkbox-container">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={showCustomDiv}
            onChange={handleCheckboxChange}
            className="toggle-checkbox"
          />
          <span className="toggle-slider"></span>
         
        </label>
      </div>

      <div className='div-flexbox' id='first-column'>
        <div className="todo-container">
        {!showCustomDiv && <Chatbox />}

        </div>

        <div className="planet-name">
          <h1 className='exo-2-bold-text1'>{name}</h1>
          <h3 className='exo-2-bold-text1'>{namesake}</h3>
        </div>

        {/* Conditionally render Spotify iframe or Custom Div */}
        {!showCustomDiv ? (
          <div className='div-spotify'>
            <iframe
              id="spotify"
              src="https://open.spotify.com/embed/playlist/2EIqlPcVMRx0MXU96szswx?utm_source=generator"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
              style={{
                width: '100%',
                height: '350px',
                pointerEvents: 'auto',
              }}
            />
          </div>
        ) : (
          <div className="todo-container custom-div">
            <div className="info">
              {description}
            </div>

            <div className="metrics">
              <div className="metric-item">
                <div className="data">{yearLength}</div>
                <div className="metric-label small-text">EARTH DAYS</div>
                <div className="small-text">Length of Year</div>
              </div>

              <div className="metric-item">
                <div className="data">{distanceFromSun}</div>
                <div className="metric-label small-text">AU</div>
                <div className="small-text">Distance From Sun</div>
              </div>

              <div className="metric-item">
                <div className="data">{moons}</div>
                <div className="metric-label small-text">Moons</div>
              </div>
            </div>
          </div>

          
        )}
      </div>

      <div className="planet-viewer-wrapper">

        {/* Previous Button */}
        <div className="aaa">
          <LeftRightButton
            onClick={handlePrevPlanet}
            imgSrc={leftIcon}
            imgAlt="Previous"
          />
        </div>

        {/* Model Viewer */}
        <div className={`model-viewer-container ${isAnimating ? 'animate' : ''}`}>
          <ModelViewer key={currentPlanet} planet={planetModels[currentPlanet]} />
        </div>

        {/* Next Button */}
        <div className="aaa">
          <LeftRightButton
            onClick={handleNextPlanet}
            imgSrc={rightIcon}
            imgAlt="Next"
          />
        </div>
      </div>

      {/* Conditionally render second-column or nothing */}
      {!showCustomDiv && (
        <div className='div-flexbox' id='second-column'>
          <div className="todo-container">
            <Calendar />
          </div>

          <div className="todo-container">
            <h2>
              Completed Tasks: <span id="completed-count">{completedTasksCount}</span> /{' '}
              <span id="total-count">{tasks.length}</span>
            </h2>
            <ul id="task-list">
              {tasks.map((task) => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                  <span className="delete" onClick={() => removeTask(task.id)}>
                    &#x2716;
                  </span>
                </li>
              ))}
            </ul>
            <div className="input-group">
              <input
                type="text"
                id="new-task"
                placeholder="+ Add new task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
            </div>
          </div>
        </div>
      )}

      {/* Optionally, you can adjust the placement of the custom div here if needed */}

      <div className="space">
      </div>
    </>
  );
};

export default PlanetViewer;
