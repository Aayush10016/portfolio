"use client";
import { Activity, Bug, Network, Eye, RotateCcw, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import type { AchievementId } from "./portfolio";

const algorithmRounds = [
  {
    answer: "Merge Sort",
    clue: "The formation keeps splitting, then recombining into calm order.",
    insight: "Aayush likes algorithms that make chaos explainable through structure."
  },
  {
    answer: "Bubble Sort",
    clue: "Neighbors keep swapping after tiny collisions until the whole line calms down.",
    insight: "Even inefficient ideas teach the cost of repeated work."
  },
  {
    answer: "Selection Sort",
    clue: "One scout searches the whole pitch for the smallest option, then locks it into place.",
    insight: "Selection thinking is useful when the next best choice matters more than speed."
  },
  {
    answer: "Insertion Sort",
    clue: "Each new player steps into the correct pocket inside an already organized line.",
    insight: "Aayush notices when local order can avoid a full rebuild."
  },
  {
    answer: "BFS",
    clue: "The search expands level by level, like defenders stepping up together.",
    insight: "Breadth-first thinking shows up in debugging: inspect the nearest causes first."
  },
  {
    answer: "Quick Sort",
    clue: "A pivot takes command and the rest of the squad rearranges around it.",
    insight: "Good systems often start by choosing the right boundary."
  },
  {
    answer: "DFS",
    clue: "The run goes deep down one channel before returning to try the next.",
    insight: "Depth-first thinking is useful when one path needs full commitment before comparison."
  },
  {
    answer: "Binary Search",
    clue: "The field is already ordered, so the search cuts the remaining space in half.",
    insight: "Good assumptions are powerful when they are true and dangerous when they are not."
  },
  {
    answer: "Two Pointers",
    clue: "Two players move from opposite lanes, closing space until the target appears.",
    insight: "Some problems become simpler when pressure comes from both sides."
  }
] as const;

const algorithmChoices = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Merge Sort",
  "Quick Sort",
  "BFS",
  "DFS",
  "Binary Search",
  "Two Pointers"
];

const systemPuzzles = [
  {
    title: "Secure Agreement Platform",
    clue: "Identity, entry, speed, async work, storage, accountability.",
    correct: ["Authentication", "API", "Cache", "Queue", "Database", "Audit"]
  },
  {
    title: "Music Discovery Platform",
    clue: "Identity, entry, personalization, memory, speed, insight.",
    correct: ["Authentication", "API", "Recommendation Engine", "Database", "Cache", "Analytics"]
  }
];

export default function MatchGames({ unlock }: { unlock: (id: AchievementId) => void }) {
  const [tab, setTab] = useState<"algorithm" | "bug" | "system">("algorithm");

  return (
    <section id="halftime-games" className="phase halftime">
      <div className="phase-kicker">
        <span>THE TRAINING GROUND</span>
        <strong>HALFTIME</strong>
      </div>
      <div className="halftime-header">
        <h2>Think on your feet.</h2>
        <p>
          Take an optional halftime break: read an algorithm, spot a bug, or build a system formation. Your discoveries earn trophies.
        </p>
      </div>
      <div className="game-shell">
        <div className="tab-row" role="group" aria-label="Halftime games">
          <button type="button" aria-pressed={tab === "algorithm"} className={clsx(tab === "algorithm" && "active")} onClick={() => setTab("algorithm")}>
            <Activity size={17} />
            Guess The Algorithm
          </button>
          <button type="button" aria-pressed={tab === "bug"} className={clsx(tab === "bug" && "active")} onClick={() => setTab("bug")}>
            <Bug size={17} />
            Bug Hunt
          </button>
          <button type="button" aria-pressed={tab === "system"} className={clsx(tab === "system" && "active")} onClick={() => setTab("system")}>
            <Network size={17} />
            System Puzzle
          </button>
        </div>
        <AnimatePresence mode="wait">
          {tab === "algorithm" ? <AlgorithmGame key="algorithm" unlock={unlock} /> : null}
          {tab === "bug" ? <BugHunt key="bug" unlock={unlock} /> : null}
          {tab === "system" ? <SystemPuzzle key="system" unlock={unlock} /> : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

function AlgorithmGame({ unlock }: { unlock: (id: AchievementId) => void }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);
  const [message, setMessage] = useState("Watch the movement, then call the play.");
  const active = algorithmRounds[round];
  const completed = Math.round((answered.length / algorithmRounds.length) * 100);

  const choose = (choice: string) => {
    if (choice === active.answer) {
      setMessage(active.insight);
      setAnswered((current) => (current.includes(active.answer) ? current : [...current, active.answer]));
      setScore((current) => (answered.includes(active.answer) ? current : current + 10));
      unlock("algorithm");
    } else {
      setMessage(`Wrong call. ${active.answer} was hiding in the movement. Reset your eyes and try the next replay.`);
    }
  };

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
      <div className="game-copy">
        <p className="eyebrow">Read the algorithm</p>
        <h3>Guess The Algorithm</h3>
        <p>{active.clue}</p>
        <strong className="insight-line" role="status">{message}</strong>
        <div className="game-progress" aria-label="Algorithm game progress">
          <span>Score {score}</span>
          <span>{completed}% complete</span>
          <div>
            <i style={{ width: `${completed}%` }} />
          </div>
        </div>
      </div>
      <AlgorithmVisual name={active.answer} round={round} />
      <div className="choice-grid">
        {algorithmChoices.map((choice) => (
          <button type="button" key={choice} onClick={() => choose(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <button
        className="small-action"
        type="button"
        onClick={() => {
          setRound((value) => (value + 1) % algorithmRounds.length);
          setMessage("Watch the movement, then call the play.");
        }}
      >
        Next visualization
      </button>
    </motion.div>
  );
}

function AlgorithmVisual({ name, round }: { name: string; round: number }) {
  const reduced = useReducedMotion();
  const bars = [38, 72, 24, 88, 55, 43, 96, 62, 31, 79];
  const graphOrder = name === "DFS" ? [0, 2, 4, 5, 1, 3] : [0, 1, 2, 3, 4, 5];

  if (name === "BFS" || name === "DFS") {
    return (
      <div className="graph-visual" aria-label={`${name} graph visualization`}>
        {graphOrder.map((node, index) => (
          <motion.span
            key={`${round}-${node}`}
            className="graph-node"
            style={{ left: `${18 + ((node * 17) % 64)}%`, top: `${22 + ((node * 29) % 50)}%` }}
            animate={{ scale: [0.85, 1.15, 1], opacity: [0.5, 1, 0.85] }}
            transition={{ duration: 0.7, delay: index * 0.22, repeat: reduced ? 0 : Infinity, repeatDelay: 2.2 }}
          >
            {node + 1}
          </motion.span>
        ))}
        <i className="graph-line one" />
        <i className="graph-line two" />
        <i className="graph-line three" />
      </div>
    );
  }

  if (name === "Binary Search" || name === "Two Pointers") {
    return (
      <div className="search-visual" aria-label={`${name} visualization`}>
        {bars.map((height, index) => {
          const activeIndex = name === "Binary Search" ? index === 4 || index === 5 : index === 1 || index === 8;
          return (
            <motion.i
              key={`${round}-${name}-${index}`}
              className={clsx(activeIndex && "active")}
              animate={{ y: activeIndex ? [0, -12, 0] : [0, 0, 0], opacity: activeIndex ? [0.72, 1, 0.72] : 0.42 }}
              transition={{ duration: 1.1, repeat: reduced ? 0 : Infinity, delay: index * 0.05 }}
            >
              {height}
            </motion.i>
          );
        })}
      </div>
    );
  }

  return (
    <div className="sort-visual" aria-label={`${name} sorting visualization`}>
      {bars.map((height, index) => (
        <motion.i
          key={`${round}-${height}-${index}`}
          style={{ height: `${height}%` }}
          animate={{
            height:
              name === "Merge Sort"
                ? [`${height}%`, `${[24, 31, 38, 43, 55, 62, 72, 79, 88, 96][index]}%`]
                : [`${height}%`, `${bars[(index + 3) % bars.length]}%`, `${[24, 31, 38, 43, 55, 62, 72, 79, 88, 96][index]}%`]
          }}
          transition={{ duration: 1.6, repeat: reduced ? 0 : Infinity, repeatDelay: 0.9, delay: index * 0.04 }}
        />
      ))}
    </div>
  );
}

function BugHunt({ unlock }: { unlock: (id: AchievementId) => void }) {
  const categoryBank = useMemo(
    () => [
      {
        title: "Runtime Bugs",
        scenarios: [
          {
            id: "null",
            title: "Null Pointer Exception",
            hint: "The player may not exist before the name is read.",
            target: "player.name",
            fix: "Guard player before accessing player.name.",
            lines: ["function greet(player) {", "  return player.name.toUpperCase();", "}"]
          },
          {
            id: "loop",
            title: "Infinite Loop",
            hint: "The counter never moves toward the whistle.",
            target: "console.log(i);",
            fix: "Increment i inside the loop.",
            lines: ["let i = 0;", "while (i < 10) {", "  console.log(i);", "}"]
          },
          {
            id: "array",
            title: "Array Index Bug",
            hint: "The final index is already one less than the length.",
            target: "i <= scores.length",
            fix: "Use i < scores.length.",
            lines: ["for (let i = 0; i <= scores.length; i++) {", "  total += scores[i];", "}"]
          },
          {
            id: "missing-await",
            title: "Missing Await",
            hint: "The database result is still a promise when the next line reads it.",
            target: "db.getUser(id)",
            fix: "Await the async database call before reading the user.",
            lines: ["async function loadUser(id) {", "  const user = db.getUser(id);", "  return user.email;", "}"]
          },
          {
            id: "timeout",
            title: "Missing Timeout",
            hint: "This API call can hang forever under bad network conditions.",
            target: "fetch(url)",
            fix: "Add a timeout or AbortController.",
            lines: ["const res = await fetch(url);", "return res.json();"]
          }
        ]
      },
      {
        title: "Security Bugs",
        scenarios: [
          {
            id: "auth",
            title: "Authentication Bug",
            hint: "A token's existence is not the same as permission.",
            target: "if (token)",
            fix: "Verify token signature and role claims.",
            lines: ["if (token) {", "  return openAdminPanel();", "}"]
          },
          {
            id: "password-log",
            title: "Sensitive Log Leak",
            hint: "One line writes something that should never leave memory.",
            target: "password",
            fix: "Never log passwords or secrets.",
            lines: ["logger.info('login attempt', { email, password });", "return auth.login(email, password);"]
          },
          {
            id: "jwt-expiry",
            title: "JWT Expiry Bug",
            hint: "The token is decoded, but not actually verified.",
            target: "jwt.decode(token)",
            fix: "Use jwt.verify and validate expiry/signature.",
            lines: ["const claims = jwt.decode(token);", "return claims.role === 'admin';"]
          },
          {
            id: "cors-wide",
            title: "CORS Misconfiguration",
            hint: "This backend trusts every origin.",
            target: "'*'",
            fix: "Restrict CORS to known trusted origins.",
            lines: ["app.use(cors({ origin: '*' }));", "app.post('/admin', handler);"]
          },
          {
            id: "env-secret",
            title: "Environment Secret Bug",
            hint: "A fallback secret makes every deployment weaker.",
            target: "'dev-secret'",
            fix: "Fail startup when required secrets are missing.",
            lines: ["const secret = process.env.JWT_SECRET || 'dev-secret';", "signToken(payload, secret);"]
          }
        ]
      },
      {
        title: "Data Bugs",
        scenarios: [
          {
            id: "sql",
            title: "SQL Query Bug",
            hint: "String-built queries invite unsafe input.",
            target: "${userId}",
            fix: "Use parameterized queries.",
            lines: ["const q = `SELECT * FROM users WHERE id = ${userId}`;", "return db.query(q);"]
          },
          {
            id: "pagination",
            title: "Pagination Bug",
            hint: "Page two repeats page one.",
            target: "page * limit",
            fix: "Use (page - 1) * limit for the offset.",
            lines: ["const offset = page * limit;", "return db.posts.findMany({ skip: offset, take: limit });"]
          },
          {
            id: "transaction",
            title: "Transaction Bug",
            hint: "Money moves in two separate promises.",
            target: "await credit(to, amount)",
            fix: "Wrap debit and credit in one database transaction.",
            lines: ["await debit(from, amount);", "await credit(to, amount);"]
          },
          {
            id: "input-trust",
            title: "Input Validation Bug",
            hint: "The request body goes straight into persistence.",
            target: "req.body",
            fix: "Validate and sanitize the body before saving.",
            lines: ["await db.user.update({ data: req.body });", "return Response.json({ ok: true });"]
          },
          {
            id: "status-code",
            title: "HTTP Status Bug",
            hint: "The server says success even when auth fails.",
            target: "status: 200",
            fix: "Return 401 or 403 for authentication failures.",
            lines: ["if (!session) return Response.json({ error: 'login' }, { status: 200 });"]
          }
        ]
      },
      {
        title: "Reliability Bugs",
        scenarios: [
          {
            id: "cache-key",
            title: "Cache Key Collision",
            hint: "Two users can accidentally share the same cached response.",
            target: "`profile:${role}`",
            fix: "Include the user id in the cache key.",
            lines: ["const key = `profile:${role}`;", "cache.set(key, profile);"]
          },
          {
            id: "rate-limit",
            title: "Rate Limit Bypass",
            hint: "The limiter is keyed too broadly.",
            target: "req.path",
            fix: "Rate-limit by user id or IP plus route.",
            lines: ["const bucket = limiter.get(req.path);", "bucket.consume();"]
          },
          {
            id: "queue-ack",
            title: "Queue Acknowledgement Bug",
            hint: "The job is marked done before the work is safe.",
            target: "job.ack()",
            fix: "Acknowledge only after processing succeeds.",
            lines: ["job.ack();", "await sendReceipt(job.data);"]
          },
          {
            id: "n-plus-one",
            title: "N+1 Query Bug",
            hint: "A loop quietly turns one request into many database hits.",
            target: "await db.artist.findUnique",
            fix: "Batch or include related records in one query.",
            lines: ["for (const song of songs) {", "  song.artist = await db.artist.findUnique({ where: { id: song.artistId } });", "}"]
          },
          {
            id: "stale-cache",
            title: "Stale Cache Bug",
            hint: "The database changes, but the cache keeps lying.",
            target: "return updated",
            fix: "Invalidate or update the cache after mutation.",
            lines: ["const updated = await db.profile.update(data);", "return updated;"]
          }
        ]
      },
      {
        title: "Integration Bugs",
        scenarios: [
          {
            id: "id-check",
            title: "Authorization Boundary Bug",
            hint: "Authentication exists, but ownership is missing.",
            target: "req.user",
            fix: "Check that the requested resource belongs to the user.",
            lines: ["if (req.user) {", "  return db.invoice.findUnique({ where: { id } });", "}"]
          },
          {
            id: "webhook",
            title: "Webhook Verification Bug",
            hint: "The handler trusts the sender without checking the signature.",
            target: "JSON.parse(body)",
            fix: "Verify the webhook signature before parsing and processing.",
            lines: ["const event = JSON.parse(body);", "await processPayment(event);"]
          },
          {
            id: "double-submit",
            title: "Double Submit Bug",
            hint: "A fast second click can create the same order twice.",
            target: "createOrder(cart)",
            fix: "Use an idempotency key for order creation.",
            lines: ["const order = await createOrder(cart);", "return Response.json(order);"]
          },
          {
            id: "sort-param",
            title: "Unsafe Sort Parameter",
            hint: "The client controls a database field name directly.",
            target: "sortBy",
            fix: "Whitelist sortable fields before building the query.",
            lines: ["return db.posts.findMany({ orderBy: { [sortBy]: 'desc' } });"]
          },
          {
            id: "retry-storm",
            title: "Retry Storm Bug",
            hint: "Every failed request immediately creates more pressure on the same service.",
            target: "retry()",
            fix: "Add backoff and a retry limit before calling the external service again.",
            lines: ["catch (error) {", "  return retry();", "}"]
          }
        ]
      }
    ],
    []
  );
  const maxAttempts = 3;
  const [categories, setCategories] = useState(categoryBank);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [solved, setSolved] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState("You have 3 chances. Click the risky fragment, or reveal the bug if you are stuck.");
  const activeCategory = categories[categoryIndex];
  const scenarios = activeCategory.scenarios;
  const active = scenarios[scenarioIndex];
  const activeSolved = solved.includes(active.id);
  const activeRevealed = revealed.includes(active.id);
  const attemptsUsed = attempts[active.id] ?? 0;
  const chancesLeft = Math.max(0, maxAttempts - attemptsUsed);
  const canGuess = !activeSolved && !activeRevealed && chancesLeft > 0;
  const tutorialHighlight = categoryIndex === 0 && scenarioIndex === 0 && !activeSolved && !activeRevealed;
  const solvedInCategory = scenarios.filter((scenario) => solved.includes(scenario.id)).length;
  const allSolved = solvedInCategory === scenarios.length;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCategories(
        [...categoryBank]
          .map((category) => ({
            ...category,
            scenarios: [...category.scenarios].sort(() => Math.random() - 0.5).slice(0, 5)
          }))
          .sort(() => Math.random() - 0.5)
      );
      setCategoryIndex(0);
      setScenarioIndex(0);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [categoryBank]);

  useEffect(() => {
    if (allSolved) {
      unlock("bug-slayer");
      unlock("backend-builder");
    }
  }, [allSolved, unlock]);

  const mark = (correct: boolean) => {
    if (!canGuess) {
      setFeedback(activeSolved ? "Already fixed. Pick another bug scenario." : "No chances left. Use Show Bug to reveal the answer.");
      return;
    }
    if (!correct) {
      const nextAttempts = attemptsUsed + 1;
      setAttempts((current) => ({ ...current, [active.id]: nextAttempts }));
      const nextLeft = Math.max(0, maxAttempts - nextAttempts);
      setFeedback(
        nextLeft
          ? `False alarm. ${nextLeft} ${nextLeft === 1 ? "chance" : "chances"} left for this bug.`
          : "No chances left for this scenario. Use Show Bug to reveal the answer."
      );
      return;
    }
    setSolved((current) => (current.includes(active.id) ? current : [...current, active.id]));
    setFeedback(`Correct. ${active.fix} Trophy progress updated.`);
  };

  const showBug = () => {
    setRevealed((current) => (current.includes(active.id) ? current : [...current, active.id]));
    setFeedback(`Bug revealed: ${active.target}. Fix: ${active.fix}`);
  };

  const resetScenario = () => {
    setRevealed((current) => current.filter((id) => id !== active.id));
    setAttempts((current) => ({ ...current, [active.id]: 0 }));
    setFeedback("Scenario reset. You have 3 chances again.");
  };

  const selectCategory = (index: number) => {
    setCategoryIndex(index);
    setScenarioIndex(0);
    setFeedback("New backend category loaded. You only see up to 5 bugs in this round.");
  };

  return (
    <motion.div className="game-panel bug-game" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
      <div className="game-copy">
        <p className="eyebrow">Spot the bug</p>
        <h3>Bug Hunt</h3>
        <p>{activeCategory.title}: {active.title}. Click the risky fragment. Hint: {active.hint}</p>
        <strong className="insight-line" role="status">
          {allSolved ? "Category clean. Move to the next backend category." : `${solvedInCategory}/${scenarios.length} bugs fixed in this category. ${feedback}`}
        </strong>
        <div className="bug-category-row" aria-label="Bug categories">
          {categories.map((category, index) => (
            <button
              type="button"
              key={category.title}
              className={clsx(index === categoryIndex && "active")}
              onClick={() => selectCategory(index)}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="bug-status" aria-label="Bug hunt status">
          <span className={clsx(chancesLeft === 1 && "warning", chancesLeft === 0 && !activeSolved && "danger")}>
            Chances left: {activeSolved ? "Fixed" : activeRevealed ? "Revealed" : `${chancesLeft}/${maxAttempts}`}
          </span>
          <span>Round {scenarioIndex + 1} of {scenarios.length}</span>
        </div>
        <div className="bug-actions">
          <button type="button" onClick={showBug} disabled={activeSolved || activeRevealed}>
            <Eye size={15} />
            Show Bug
          </button>
          <button type="button" onClick={resetScenario}>
            <RotateCcw size={15} />
            Reset Scenario
          </button>
          <button type="button" onClick={() => selectCategory((categoryIndex + 1) % categories.length)}>
            <ChevronRight size={15} />
            Next Category
          </button>
        </div>
        <div className="game-progress">
          <span>Category progress</span>
          <span>{Math.round((solvedInCategory / scenarios.length) * 100)}%</span>
          <div>
            <i style={{ width: `${(solvedInCategory / scenarios.length) * 100}%` }} />
          </div>
        </div>
      </div>
      <pre className={clsx("code-board", activeSolved && "success", activeRevealed && "revealed")} aria-label="Bug hunt code snippet">
        <code>
          {active.lines.map((line) => (
            <span key={line}>
              {line.includes(active.target) ? (
                <>
                  {line.split(active.target)[0]}
                  <button
                    type="button"
                    onClick={() => mark(true)}
                    disabled={!canGuess}
                    className={clsx(
                      "bug-target",
                      tutorialHighlight && "tutorial",
                      (activeSolved || activeRevealed) && "found",
                      activeRevealed && "revealed"
                    )}
                    aria-label={`Bug target: ${active.target}`}
                  >
                    {active.target}
                  </button>
                  {line.split(active.target)[1]}
                </>
              ) : (
                <button type="button" className="plain-code" disabled={!canGuess} onClick={() => mark(false)}>
                  {line}
                </button>
              )}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
      <div className="fix-list">
        {scenarios.map((scenario, index) => (
          <button
            type="button"
            key={scenario.id}
            className={clsx(solved.includes(scenario.id) && "done", scenarioIndex === index && "active")}
            onClick={() => {
              setScenarioIndex(index);
              setFeedback("You have 3 chances. Click the risky fragment, or reveal the bug if you are stuck.");
            }}
          >
            {solved.includes(scenario.id) ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
            {scenario.title}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function SystemPuzzle({ unlock }: { unlock: (id: AchievementId) => void }) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [formation, setFormation] = useState<string[]>([]);
  const [result, setResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const activePuzzle = systemPuzzles[puzzleIndex];
  const solved = formation.length === activePuzzle.correct.length && formation.every((item, index) => item === activePuzzle.correct[index]);
  const remaining = activePuzzle.correct.filter((item) => !formation.includes(item));

  useEffect(() => {
    if (result === "correct") {
      unlock("architect");
      unlock("backend-builder");
    }
  }, [result, unlock]);

  const submit = () => {
    if (solved) {
      setResult("correct");
      setScore((value) => result === "correct" ? value : value + 50);
    } else {
      setResult("wrong");
    }
  };

  return (
    <motion.div className={clsx("game-panel system-game", result)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
      <div className="game-copy">
        <p className="eyebrow">Shape the system</p>
        <h3>System Design Puzzle</h3>
        <p>{activePuzzle.title}. Arrange the architecture like a build-up play: {activePuzzle.clue}</p>
        <strong className="insight-line" role="status">
          {result === "correct"
            ? "Formation locked. Backend thinking is sequencing plus tradeoffs."
            : result === "wrong"
              ? "Wrong formation. Reset the shape and try again."
              : "Submit when the formation feels right."}
        </strong>
        <div className="puzzle-switcher" aria-label="System puzzle selector">
          {systemPuzzles.map((puzzle, index) => (
            <button
              type="button"
              key={puzzle.title}
              className={clsx(index === puzzleIndex && "active")}
              onClick={() => {
                setPuzzleIndex(index);
                setFormation([]);
                setResult("idle");
              }}
            >
              {puzzle.title}
            </button>
          ))}
        </div>
        <div className="system-score-box">
          <span className="score-chip">System score {score}</span>
          <div className="system-actions">
            <button type="button" onClick={submit}>
              Submit formation
            </button>
            <button
              type="button"
              onClick={() => {
                setFormation([]);
                setResult("idle");
              }}
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="formation-board">
        {activePuzzle.correct.map((_, index) => (
          <button
            type="button"
            className="formation-slot"
            key={index}
            onClick={() => {
              setFormation((current) => current.slice(0, index));
              setResult("idle");
            }}
          >
            <span>{index + 1}</span>
            <strong>{formation[index] ?? "Open role"}</strong>
          </button>
        ))}
      </div>
      <div className="bench-row">
        {remaining.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => {
              setFormation((current) => [...current, item]);
              setResult("idle");
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

