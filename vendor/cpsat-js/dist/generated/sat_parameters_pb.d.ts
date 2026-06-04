import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file sat_parameters.proto.
 */
export declare const file_sat_parameters: GenFile;
/**
 * Contains the definitions for all the sat algorithm parameters and their
 * default values.
 *
 * NEXT TAG: 356
 *
 * @generated from message operations_research.sat.SatParameters
 */
export type SatParameters = Message<"operations_research.sat.SatParameters"> & {
    /**
     * In some context, like in a portfolio of search, it makes sense to name a
     * given parameters set for logging purpose.
     *
     * @generated from field: optional string name = 171 [default = ""];
     */
    name: string;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.VariableOrder preferred_variable_order = 1 [default = IN_ORDER];
     */
    preferredVariableOrder: SatParameters_VariableOrder;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.Polarity initial_polarity = 2 [default = POLARITY_FALSE];
     */
    initialPolarity: SatParameters_Polarity;
    /**
     * If this is true, then the polarity of a variable will be the last value it
     * was assigned to, or its default polarity if it was never assigned since the
     * call to ResetDecisionHeuristic().
     *
     * Actually, we use a newer version where we follow the last value in the
     * longest non-conflicting partial assignment in the current phase.
     *
     * This is called 'literal phase saving'. For details see 'A Lightweight
     * Component Caching Scheme for Satisfiability Solvers' K. Pipatsrisawat and
     * A.Darwiche, In 10th International Conference on Theory and Applications of
     * Satisfiability Testing, 2007.
     *
     * @generated from field: optional bool use_phase_saving = 44 [default = true];
     */
    usePhaseSaving: boolean;
    /**
     * If non-zero, then we change the polarity heuristic after that many number
     * of conflicts in an arithmetically increasing fashion. So x the first time,
     * 2 * x the second time, etc...
     *
     * @generated from field: optional int32 polarity_rephase_increment = 168 [default = 1000];
     */
    polarityRephaseIncrement: number;
    /**
     * If true and we have first solution LS workers, tries in some phase to
     * follow a LS solutions that violates has litle constraints as possible.
     *
     * @generated from field: optional bool polarity_exploit_ls_hints = 309 [default = false];
     */
    polarityExploitLsHints: boolean;
    /**
     * The proportion of polarity chosen at random. Note that this take
     * precedence over the phase saving heuristic. This is different from
     * initial_polarity:POLARITY_RANDOM because it will select a new random
     * polarity each time the variable is branched upon instead of selecting one
     * initially and then always taking this choice.
     *
     * @generated from field: optional double random_polarity_ratio = 45 [default = 0];
     */
    randomPolarityRatio: number;
    /**
     * A number between 0 and 1 that indicates the proportion of branching
     * variables that are selected randomly instead of choosing the first variable
     * from the given variable_ordering strategy.
     *
     * @generated from field: optional double random_branches_ratio = 32 [default = 0];
     */
    randomBranchesRatio: number;
    /**
     * Whether we use the ERWA (Exponential Recency Weighted Average) heuristic as
     * described in "Learning Rate Based Branching Heuristic for SAT solvers",
     * J.H.Liang, V. Ganesh, P. Poupart, K.Czarnecki, SAT 2016.
     *
     * @generated from field: optional bool use_erwa_heuristic = 75 [default = false];
     */
    useErwaHeuristic: boolean;
    /**
     * The initial value of the variables activity. A non-zero value only make
     * sense when use_erwa_heuristic is true. Experiments with a value of 1e-2
     * together with the ERWA heuristic showed slighthly better result than simply
     * using zero. The idea is that when the "learning rate" of a variable becomes
     * lower than this value, then we prefer to branch on never explored before
     * variables. This is not in the ERWA paper.
     *
     * @generated from field: optional double initial_variables_activity = 76 [default = 0];
     */
    initialVariablesActivity: number;
    /**
     * When this is true, then the variables that appear in any of the reason of
     * the variables in a conflict have their activity bumped. This is addition to
     * the variables in the conflict, and the one that were used during conflict
     * resolution.
     *
     * @generated from field: optional bool also_bump_variables_in_conflict_reasons = 77 [default = false];
     */
    alsoBumpVariablesInConflictReasons: boolean;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.ConflictMinimizationAlgorithm minimization_algorithm = 4 [default = RECURSIVE];
     */
    minimizationAlgorithm: SatParameters_ConflictMinimizationAlgorithm;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.BinaryMinizationAlgorithm binary_minimization_algorithm = 34 [default = BINARY_MINIMIZATION_FROM_UIP_AND_DECISIONS];
     */
    binaryMinimizationAlgorithm: SatParameters_BinaryMinizationAlgorithm;
    /**
     * At a really low cost, during the 1-UIP conflict computation, it is easy to
     * detect if some of the involved reasons are subsumed by the current
     * conflict. When this is true, such clauses are detached and later removed
     * from the problem.
     *
     * @generated from field: optional bool subsumption_during_conflict_analysis = 56 [default = true];
     */
    subsumptionDuringConflictAnalysis: boolean;
    /**
     * It is possible that "intermediate" clauses during conflict resolution
     * subsumes some of the clauses that propagated. This is quite cheap to detect
     * and result in more subsumption/strengthening of clauses.
     *
     * @generated from field: optional bool extra_subsumption_during_conflict_analysis = 351 [default = true];
     */
    extraSubsumptionDuringConflictAnalysis: boolean;
    /**
     * Try even more subsumption options during conflict analysis.
     *
     * @generated from field: optional bool decision_subsumption_during_conflict_analysis = 353 [default = true];
     */
    decisionSubsumptionDuringConflictAnalysis: boolean;
    /**
     * If >=0, each time we have a conflict, we try to subsume the last n learned
     * clause with it.
     *
     * @generated from field: optional int32 eagerly_subsume_last_n_conflicts = 343 [default = 4];
     */
    eagerlySubsumeLastNConflicts: number;
    /**
     * If we remove clause that we now are "implied" by others. Note that this
     * might not always be good as we might loose some propagation power.
     *
     * @generated from field: optional bool subsume_during_vivification = 355 [default = true];
     */
    subsumeDuringVivification: boolean;
    /**
     * If true, try to backtrack as little as possible on conflict and re-imply
     * the clauses later.
     * This means we discard less propagation than traditional backjumping, but
     * requites additional bookkeeping to handle reimplication.
     * See: https://doi.org/10.1007/978-3-319-94144-8_7
     *
     * @generated from field: optional bool use_chronological_backtracking = 330 [default = false];
     */
    useChronologicalBacktracking: boolean;
    /**
     * If chronological backtracking is enabled, this is the maximum number of
     * levels we will backjump over, otherwise we will backtrack.
     *
     * @generated from field: optional int32 max_backjump_levels = 331 [default = 50];
     */
    maxBackjumpLevels: number;
    /**
     * If chronological backtracking is enabled, this is the minimum number of
     * conflicts before we will consider backjumping.
     *
     * @generated from field: optional int32 chronological_backtrack_min_conflicts = 332 [default = 1000];
     */
    chronologicalBacktrackMinConflicts: number;
    /**
     * Trigger a cleanup when this number of "deletable" clauses is learned.
     *
     * @generated from field: optional int32 clause_cleanup_period = 11 [default = 10000];
     */
    clauseCleanupPeriod: number;
    /**
     * Increase clause_cleanup_period by this amount after each cleanup.
     *
     * @generated from field: optional int32 clause_cleanup_period_increment = 337 [default = 0];
     */
    clauseCleanupPeriodIncrement: number;
    /**
     * During a cleanup, we will always keep that number of "deletable" clauses.
     * Note that this doesn't include the "protected" clauses.
     *
     * @generated from field: optional int32 clause_cleanup_target = 13 [default = 0];
     */
    clauseCleanupTarget: number;
    /**
     * During a cleanup, if clause_cleanup_target is 0, we will delete the
     * clause_cleanup_ratio of "deletable" clauses instead of aiming for a fixed
     * target of clauses to keep.
     *
     * @generated from field: optional double clause_cleanup_ratio = 190 [default = 0.5];
     */
    clauseCleanupRatio: number;
    /**
     * All the clauses with a LBD (literal blocks distance) lower or equal to this
     * parameters will always be kept.
     *
     * Note that the LBD of a clause that just propagated is 1 + number of
     * different decision levels of its literals. So that the "classic" LBD of a
     * learned conflict is the same as its LBD when we backjump and then propagate
     * it.
     *
     * @generated from field: optional int32 clause_cleanup_lbd_bound = 59 [default = 5];
     */
    clauseCleanupLbdBound: number;
    /**
     * All the clause with a LBD lower or equal to this will be kept except if
     * its activity hasn't been bumped in the last 32 cleanup phase. Note that
     * this has no effect if it is <= clause_cleanup_lbd_bound.
     *
     * @generated from field: optional int32 clause_cleanup_lbd_tier1 = 349 [default = 0];
     */
    clauseCleanupLbdTier1: number;
    /**
     * All the clause with a LBD lower or equal to this will be kept except if its
     * activity hasn't been bumped since the previous cleanup phase. Note that
     * this has no effect if it is <= clause_cleanup_lbd_bound or <=
     * clause_cleanup_lbd_tier1.
     *
     * @generated from field: optional int32 clause_cleanup_lbd_tier2 = 350 [default = 0];
     */
    clauseCleanupLbdTier2: number;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.ClauseOrdering clause_cleanup_ordering = 60 [default = CLAUSE_ACTIVITY];
     */
    clauseCleanupOrdering: SatParameters_ClauseOrdering;
    /**
     * Same as for the clauses, but for the learned pseudo-Boolean constraints.
     *
     * @generated from field: optional int32 pb_cleanup_increment = 46 [default = 200];
     */
    pbCleanupIncrement: number;
    /**
     * @generated from field: optional double pb_cleanup_ratio = 47 [default = 0.5];
     */
    pbCleanupRatio: number;
    /**
     * Each time a conflict is found, the activities of some variables are
     * increased by one. Then, the activity of all variables are multiplied by
     * variable_activity_decay.
     *
     * To implement this efficiently, the activity of all the variables is not
     * decayed at each conflict. Instead, the activity increment is multiplied by
     * 1 / decay. When an activity reach max_variable_activity_value, all the
     * activity are multiplied by 1 / max_variable_activity_value.
     *
     * @generated from field: optional double variable_activity_decay = 15 [default = 0.8];
     */
    variableActivityDecay: number;
    /**
     * @generated from field: optional double max_variable_activity_value = 16 [default = 1e+100];
     */
    maxVariableActivityValue: number;
    /**
     * The activity starts at 0.8 and increment by 0.01 every 5000 conflicts until
     * 0.95. This "hack" seems to work well and comes from:
     *
     * Glucose 2.3 in the SAT 2013 Competition - SAT Competition 2013
     * http://edacc4.informatik.uni-ulm.de/SC13/solver-description-download/136
     *
     * @generated from field: optional double glucose_max_decay = 22 [default = 0.95];
     */
    glucoseMaxDecay: number;
    /**
     * @generated from field: optional double glucose_decay_increment = 23 [default = 0.01];
     */
    glucoseDecayIncrement: number;
    /**
     * @generated from field: optional int32 glucose_decay_increment_period = 24 [default = 5000];
     */
    glucoseDecayIncrementPeriod: number;
    /**
     * Clause activity parameters (same effect as the one on the variables).
     *
     * @generated from field: optional double clause_activity_decay = 17 [default = 0.999];
     */
    clauseActivityDecay: number;
    /**
     * @generated from field: optional double max_clause_activity_value = 18 [default = 1e+20];
     */
    maxClauseActivityValue: number;
    /**
     * The restart strategies will change each time the strategy_counter is
     * increased. The current strategy will simply be the one at index
     * strategy_counter modulo the number of strategy. Note that if this list
     * includes a NO_RESTART, nothing will change when it is reached because the
     * strategy_counter will only increment after a restart.
     *
     * The idea of switching of search strategy tailored for SAT/UNSAT comes from
     * Chanseok Oh with his COMiniSatPS solver, see http://cs.nyu.edu/~chanseok/.
     * But more generally, it seems REALLY beneficial to try different strategy.
     *
     * @generated from field: repeated operations_research.sat.SatParameters.RestartAlgorithm restart_algorithms = 61;
     */
    restartAlgorithms: SatParameters_RestartAlgorithm[];
    /**
     * @generated from field: optional string default_restart_algorithms = 70 [default = "LUBY_RESTART,LBD_MOVING_AVERAGE_RESTART,DL_MOVING_AVERAGE_RESTART"];
     */
    defaultRestartAlgorithms: string;
    /**
     * Restart period for the FIXED_RESTART strategy. This is also the multiplier
     * used by the LUBY_RESTART strategy.
     *
     * @generated from field: optional int32 restart_period = 30 [default = 50];
     */
    restartPeriod: number;
    /**
     * Size of the window for the moving average restarts.
     *
     * @generated from field: optional int32 restart_running_window_size = 62 [default = 50];
     */
    restartRunningWindowSize: number;
    /**
     * In the moving average restart algorithms, a restart is triggered if the
     * window average times this ratio is greater that the global average.
     *
     * @generated from field: optional double restart_dl_average_ratio = 63 [default = 1];
     */
    restartDlAverageRatio: number;
    /**
     * @generated from field: optional double restart_lbd_average_ratio = 71 [default = 1];
     */
    restartLbdAverageRatio: number;
    /**
     * Block a moving restart algorithm if the trail size of the current conflict
     * is greater than the multiplier times the moving average of the trail size
     * at the previous conflicts.
     *
     * @generated from field: optional bool use_blocking_restart = 64 [default = false];
     */
    useBlockingRestart: boolean;
    /**
     * @generated from field: optional int32 blocking_restart_window_size = 65 [default = 5000];
     */
    blockingRestartWindowSize: number;
    /**
     * @generated from field: optional double blocking_restart_multiplier = 66 [default = 1.4];
     */
    blockingRestartMultiplier: number;
    /**
     * After each restart, if the number of conflict since the last strategy
     * change is greater that this, then we increment a "strategy_counter" that
     * can be use to change the search strategy used by the following restarts.
     *
     * @generated from field: optional int32 num_conflicts_before_strategy_changes = 68 [default = 0];
     */
    numConflictsBeforeStrategyChanges: number;
    /**
     * The parameter num_conflicts_before_strategy_changes is increased by that
     * much after each strategy change.
     *
     * @generated from field: optional double strategy_change_increase_ratio = 69 [default = 0];
     */
    strategyChangeIncreaseRatio: number;
    /**
     * Maximum time allowed in seconds to solve a problem.
     * The counter will starts at the beginning of the Solve() call.
     *
     * @generated from field: optional double max_time_in_seconds = 36 [default = inf];
     */
    maxTimeInSeconds: number;
    /**
     * Maximum time allowed in deterministic time to solve a problem.
     * The deterministic time should be correlated with the real time used by the
     * solver, the time unit being as close as possible to a second.
     *
     * @generated from field: optional double max_deterministic_time = 67 [default = inf];
     */
    maxDeterministicTime: number;
    /**
     * Stops after that number of batches has been scheduled. This only make sense
     * when interleave_search is true.
     *
     * @generated from field: optional int32 max_num_deterministic_batches = 291 [default = 0];
     */
    maxNumDeterministicBatches: number;
    /**
     * Maximum number of conflicts allowed to solve a problem.
     *
     * TODO(user): Maybe change the way the conflict limit is enforced?
     * currently it is enforced on each independent internal SAT solve, rather
     * than on the overall number of conflicts across all solves. So in the
     * context of an optimization problem, this is not really usable directly by a
     * client.
     *
     * kint64max
     *
     * @generated from field: optional int64 max_number_of_conflicts = 37 [default = 9223372036854775807];
     */
    maxNumberOfConflicts: bigint;
    /**
     * Maximum memory allowed for the whole thread containing the solver. The
     * solver will abort as soon as it detects that this limit is crossed. As a
     * result, this limit is approximative, but usually the solver will not go too
     * much over.
     *
     * TODO(user): This is only used by the pure SAT solver, generalize to CP-SAT.
     *
     * @generated from field: optional int64 max_memory_in_mb = 40 [default = 10000];
     */
    maxMemoryInMb: bigint;
    /**
     * Stop the search when the gap between the best feasible objective (O) and
     * our best objective bound (B) is smaller than a limit.
     * The exact definition is:
     * - Absolute: abs(O - B)
     * - Relative: abs(O - B) / max(1, abs(O)).
     *
     * Important: The relative gap depends on the objective offset! If you
     * artificially shift the objective, you will get widely different value of
     * the relative gap.
     *
     * Note that if the gap is reached, the search status will be OPTIMAL. But
     * one can check the best objective bound to see the actual gap.
     *
     * If the objective is integer, then any absolute gap < 1 will lead to a true
     * optimal. If the objective is floating point, a gap of zero make little
     * sense so is is why we use a non-zero default value. At the end of the
     * search, we will display a warning if OPTIMAL is reported yet the gap is
     * greater than this absolute gap.
     *
     * @generated from field: optional double absolute_gap_limit = 159 [default = 0.0001];
     */
    absoluteGapLimit: number;
    /**
     * @generated from field: optional double relative_gap_limit = 160 [default = 0];
     */
    relativeGapLimit: number;
    /**
     * At the beginning of each solve, the random number generator used in some
     * part of the solver is reinitialized to this seed. If you change the random
     * seed, the solver may make different choices during the solving process.
     *
     * For some problems, the running time may vary a lot depending on small
     * change in the solving algorithm. Running the solver with different seeds
     * enables to have more robust benchmarks when evaluating new features.
     *
     * @generated from field: optional int32 random_seed = 31 [default = 1];
     */
    randomSeed: number;
    /**
     * This is mainly here to test the solver variability. Note that in tests, if
     * not explicitly set to false, all 3 options will be set to true so that
     * clients do not rely on the solver returning a specific solution if they are
     * many equivalent optimal solutions.
     *
     * @generated from field: optional bool permute_variable_randomly = 178 [default = false];
     */
    permuteVariableRandomly: boolean;
    /**
     * @generated from field: optional bool permute_presolve_constraint_order = 179 [default = false];
     */
    permutePresolveConstraintOrder: boolean;
    /**
     * @generated from field: optional bool use_absl_random = 180 [default = false];
     */
    useAbslRandom: boolean;
    /**
     * Whether the solver should log the search progress. This is the maing
     * logging parameter and if this is false, none of the logging (callbacks,
     * log_to_stdout, log_to_response, ...) will do anything.
     *
     * @generated from field: optional bool log_search_progress = 41 [default = false];
     */
    logSearchProgress: boolean;
    /**
     * Whether the solver should display per sub-solver search statistics.
     * This is only useful is log_search_progress is set to true, and if the
     * number of search workers is > 1. Note that in all case we display a bit
     * of stats with one line per subsolver.
     *
     * @generated from field: optional bool log_subsolver_statistics = 189 [default = false];
     */
    logSubsolverStatistics: boolean;
    /**
     * Add a prefix to all logs.
     *
     * @generated from field: optional string log_prefix = 185 [default = ""];
     */
    logPrefix: string;
    /**
     * Log to stdout.
     *
     * @generated from field: optional bool log_to_stdout = 186 [default = true];
     */
    logToStdout: boolean;
    /**
     * Log to response proto.
     *
     * @generated from field: optional bool log_to_response = 187 [default = false];
     */
    logToResponse: boolean;
    /**
     * Experimental.
     *
     * This is an old experiment, it might cause crashes in multi-thread and you
     * should double check the solver result. It can still be used if you only
     * care about feasible solutions (these are checked) and it gives good result
     * on your problem. We might revive it at some point.
     *
     * Whether to use pseudo-Boolean resolution to analyze a conflict. Note that
     * this option only make sense if your problem is modelized using
     * pseudo-Boolean constraints. If you only have clauses, this shouldn't change
     * anything (except slow the solver down).
     *
     * @generated from field: optional bool use_pb_resolution = 43 [default = false];
     */
    usePbResolution: boolean;
    /**
     * A different algorithm during PB resolution. It minimizes the number of
     * calls to ReduceCoefficients() which can be time consuming. However, the
     * search space will be different and if the coefficients are large, this may
     * lead to integer overflows that could otherwise be prevented.
     *
     * @generated from field: optional bool minimize_reduction_during_pb_resolution = 48 [default = false];
     */
    minimizeReductionDuringPbResolution: boolean;
    /**
     * Whether or not the assumption levels are taken into account during the LBD
     * computation. According to the reference below, not counting them improves
     * the solver in some situation. Note that this only impact solves under
     * assumptions.
     *
     * Gilles Audemard, Jean-Marie Lagniez, Laurent Simon, "Improving Glucose for
     * Incremental SAT Solving with Assumptions: Application to MUS Extraction"
     * Theory and Applications of Satisfiability Testing - SAT 2013, Lecture Notes
     * in Computer Science Volume 7962, 2013, pp 309-317.
     *
     * @generated from field: optional bool count_assumption_levels_in_lbd = 49 [default = true];
     */
    countAssumptionLevelsInLbd: boolean;
    /**
     * During presolve, only try to perform the bounded variable elimination (BVE)
     * of a variable x if the number of occurrences of x times the number of
     * occurrences of not(x) is not greater than this parameter.
     *
     * @generated from field: optional int32 presolve_bve_threshold = 54 [default = 500];
     */
    presolveBveThreshold: number;
    /**
     * Internal parameter. During BVE, if we eliminate a variable x, by default we
     * will push all clauses containing x and all clauses containing not(x) to the
     * postsolve. However, it is possible to write the postsolve code so that only
     * one such set is needed. The idea is that, if we push the set containing a
     * literal l, is to set l to false except if it is needed to satisfy one of
     * the clause in the set. This is always beneficial, but for historical
     * reason, not all our postsolve algorithm support this.
     *
     * @generated from field: optional bool filter_sat_postsolve_clauses = 324 [default = false];
     */
    filterSatPostsolveClauses: boolean;
    /**
     * During presolve, we apply BVE only if this weight times the number of
     * clauses plus the number of clause literals is not increased.
     *
     * @generated from field: optional int32 presolve_bve_clause_weight = 55 [default = 3];
     */
    presolveBveClauseWeight: number;
    /**
     * The maximum "deterministic" time limit to spend in probing. A value of
     * zero will disable the probing.
     *
     * TODO(user): Clean up. The first one is used in CP-SAT, the other in pure
     * SAT presolve.
     *
     * @generated from field: optional double probing_deterministic_time_limit = 226 [default = 1];
     */
    probingDeterministicTimeLimit: number;
    /**
     * @generated from field: optional double presolve_probing_deterministic_time_limit = 57 [default = 30];
     */
    presolveProbingDeterministicTimeLimit: number;
    /**
     * Whether we use an heuristic to detect some basic case of blocked clause
     * in the SAT presolve.
     *
     * @generated from field: optional bool presolve_blocked_clause = 88 [default = true];
     */
    presolveBlockedClause: boolean;
    /**
     * Whether or not we use Bounded Variable Addition (BVA) in the presolve.
     *
     * @generated from field: optional bool presolve_use_bva = 72 [default = true];
     */
    presolveUseBva: boolean;
    /**
     * Apply Bounded Variable Addition (BVA) if the number of clauses is reduced
     * by stricly more than this threshold. The algorithm described in the paper
     * uses 0, but quick experiments showed that 1 is a good value. It may not be
     * worth it to add a new variable just to remove one clause.
     *
     * @generated from field: optional int32 presolve_bva_threshold = 73 [default = 1];
     */
    presolveBvaThreshold: number;
    /**
     * In case of large reduction in a presolve iteration, we perform multiple
     * presolve iterations. This parameter controls the maximum number of such
     * presolve iterations.
     *
     * @generated from field: optional int32 max_presolve_iterations = 138 [default = 3];
     */
    maxPresolveIterations: number;
    /**
     * Whether we presolve the cp_model before solving it.
     *
     * @generated from field: optional bool cp_model_presolve = 86 [default = true];
     */
    cpModelPresolve: boolean;
    /**
     * How much effort do we spend on probing. 0 disables it completely.
     *
     * @generated from field: optional int32 cp_model_probing_level = 110 [default = 2];
     */
    cpModelProbingLevel: number;
    /**
     * Whether we also use the sat presolve when cp_model_presolve is true.
     *
     * @generated from field: optional bool cp_model_use_sat_presolve = 93 [default = true];
     */
    cpModelUseSatPresolve: boolean;
    /**
     * If we try to load at most ones and exactly ones constraints when running
     * the pure SAT presolve. Or if we just ignore them.
     *
     * If one detects at_most_one via merge_at_most_one_work_limit or exactly one
     * with find_clauses_that_are_exactly_one, it might be good to also set this
     * to true.
     *
     * @generated from field: optional bool load_at_most_ones_in_sat_presolve = 335 [default = false];
     */
    loadAtMostOnesInSatPresolve: boolean;
    /**
     * If cp_model_presolve is true and there is a large proportion of fixed
     * variable after the first model copy, remap all the model to a dense set of
     * variable before the full presolve even starts. This should help for LNS on
     * large models.
     *
     * @generated from field: optional bool remove_fixed_variables_early = 310 [default = true];
     */
    removeFixedVariablesEarly: boolean;
    /**
     * If true, we detect variable that are unique to a table constraint and only
     * there to encode a cost on each tuple. This is usually the case when a WCSP
     * (weighted constraint program) is encoded into CP-SAT format.
     *
     * This can lead to a dramatic speed-up for such problems but is still
     * experimental at this point.
     *
     * @generated from field: optional bool detect_table_with_cost = 216 [default = false];
     */
    detectTableWithCost: boolean;
    /**
     * How much we try to "compress" a table constraint. Compressing more leads to
     * less Booleans and faster propagation but can reduced the quality of the lp
     * relaxation. Values goes from 0 to 3 where we always try to fully compress a
     * table. At 2, we try to automatically decide if it is worth it.
     *
     * @generated from field: optional int32 table_compression_level = 217 [default = 2];
     */
    tableCompressionLevel: number;
    /**
     * If true, expand all_different constraints that are not permutations.
     * Permutations (#Variables = #Values) are always expanded.
     *
     * @generated from field: optional bool expand_alldiff_constraints = 170 [default = false];
     */
    expandAlldiffConstraints: boolean;
    /**
     * Max domain size for all_different constraints to be expanded.
     *
     * @generated from field: optional int32 max_alldiff_domain_size = 320 [default = 256];
     */
    maxAlldiffDomainSize: number;
    /**
     * If true, expand the reservoir constraints by creating booleans for all
     * possible precedences between event and encoding the constraint.
     *
     * @generated from field: optional bool expand_reservoir_constraints = 182 [default = true];
     */
    expandReservoirConstraints: boolean;
    /**
     * Max domain size for expanding linear2 constraints (ax + by ==/!= c).
     *
     * @generated from field: optional int32 max_domain_size_for_linear2_expansion = 340 [default = 8];
     */
    maxDomainSizeForLinear2Expansion: number;
    /**
     * Mainly useful for testing.
     *
     * If this and expand_reservoir_constraints is true, we use a different
     * encoding of the reservoir constraint using circuit instead of precedences.
     * Note that this is usually slower, but can exercise different part of the
     * solver. Note that contrary to the precedence encoding, this easily support
     * variable demands.
     *
     * WARNING: with this encoding, the constraint takes a slightly different
     * meaning. There must exist a permutation of the events occurring at the same
     * time such that the level is within the reservoir after each of these events
     * (in this permuted order). So we cannot have +100 and -100 at the same time
     * if the level must be between 0 and 10 (as authorized by the reservoir
     * constraint).
     *
     * @generated from field: optional bool expand_reservoir_using_circuit = 288 [default = false];
     */
    expandReservoirUsingCircuit: boolean;
    /**
     * Encore cumulative with fixed demands and capacity as a reservoir
     * constraint. The only reason you might want to do that is to test the
     * reservoir propagation code!
     *
     * @generated from field: optional bool encode_cumulative_as_reservoir = 287 [default = false];
     */
    encodeCumulativeAsReservoir: boolean;
    /**
     * If the number of expressions in the lin_max is less that the max size
     * parameter, model expansion replaces target = max(xi) by linear constraint
     * with the introduction of new booleans bi such that bi => target == xi.
     *
     * This is mainly for experimenting compared to a custom lin_max propagator.
     *
     * @generated from field: optional int32 max_lin_max_size_for_expansion = 280 [default = 0];
     */
    maxLinMaxSizeForExpansion: number;
    /**
     * If true, it disable all constraint expansion.
     * This should only be used to test the presolve of expanded constraints.
     *
     * @generated from field: optional bool disable_constraint_expansion = 181 [default = false];
     */
    disableConstraintExpansion: boolean;
    /**
     * Linear constraint with a complex right hand side (more than a single
     * interval) need to be expanded, there is a couple of way to do that.
     *
     * @generated from field: optional bool encode_complex_linear_constraint_with_integer = 223 [default = false];
     */
    encodeComplexLinearConstraintWithInteger: boolean;
    /**
     * During presolve, we use a maximum clique heuristic to merge together
     * no-overlap constraints or at most one constraints. This code can be slow,
     * so we have a limit in place on the number of explored nodes in the
     * underlying graph. The internal limit is an int64, but we use double here to
     * simplify manual input.
     *
     * @generated from field: optional double merge_no_overlap_work_limit = 145 [default = 1e+12];
     */
    mergeNoOverlapWorkLimit: number;
    /**
     * @generated from field: optional double merge_at_most_one_work_limit = 146 [default = 1e+08];
     */
    mergeAtMostOneWorkLimit: number;
    /**
     * How much substitution (also called free variable aggregation in MIP
     * litterature) should we perform at presolve. This currently only concerns
     * variable appearing only in linear constraints. For now the value 0 turns it
     * off and any positive value performs substitution.
     *
     * @generated from field: optional int32 presolve_substitution_level = 147 [default = 1];
     */
    presolveSubstitutionLevel: number;
    /**
     * If true, we will extract from linear constraints, enforcement literals of
     * the form "integer variable at bound => simplified constraint". This should
     * always be beneficial except that we don't always handle them as efficiently
     * as we could for now. This causes problem on manna81.mps (LP relaxation not
     * as tight it seems) and on neos-3354841-apure.mps.gz (too many literals
     * created this way).
     *
     * @generated from field: optional bool presolve_extract_integer_enforcement = 174 [default = false];
     */
    presolveExtractIntegerEnforcement: boolean;
    /**
     * A few presolve operations involve detecting constraints included in other
     * constraint. Since there can be a quadratic number of such pairs, and
     * processing them usually involve scanning them, the complexity of these
     * operations can be big. This enforce a local deterministic limit on the
     * number of entries scanned. Default is 1e8.
     *
     * A value of zero will disable these presolve rules completely.
     *
     * @generated from field: optional int64 presolve_inclusion_work_limit = 201 [default = 100000000];
     */
    presolveInclusionWorkLimit: bigint;
    /**
     * If true, we don't keep names in our internal copy of the user given model.
     *
     * @generated from field: optional bool ignore_names = 202 [default = true];
     */
    ignoreNames: boolean;
    /**
     * Run a max-clique code amongst all the x != y we can find and try to infer
     * set of variables that are all different. This allows to close neos16.mps
     * for instance. Note that we only run this code if there is no all_diff
     * already in the model so that if a user want to add some all_diff, we assume
     * it is well done and do not try to add more.
     *
     * This will also detect and add no_overlap constraints, if all the relations
     * x != y have "offsets" between them. I.e. x > y + offset.
     *
     * @generated from field: optional bool infer_all_diffs = 233 [default = true];
     */
    inferAllDiffs: boolean;
    /**
     * Try to find large "rectangle" in the linear constraint matrix with
     * identical lines. If such rectangle is big enough, we can introduce a new
     * integer variable corresponding to the common expression and greatly reduce
     * the number of non-zero.
     *
     * @generated from field: optional bool find_big_linear_overlap = 234 [default = true];
     */
    findBigLinearOverlap: boolean;
    /**
     * By propagating (or just using binary clauses), one can detect that all
     * literal of a clause are actually in at most one relationship. Thus this
     * constraint can be promoted to an exactly one constraints. This should help
     * as it convey more structure. Note that this is expensive, so we have a
     * deterministic limit in place.
     *
     * @generated from field: optional bool find_clauses_that_are_exactly_one = 333 [default = true];
     */
    findClausesThatAreExactlyOne: boolean;
    /**
     * Enable or disable "inprocessing" which is some SAT presolving done at
     * each restart to the root level.
     *
     * @generated from field: optional bool use_sat_inprocessing = 163 [default = true];
     */
    useSatInprocessing: boolean;
    /**
     * Proportion of deterministic time we should spend on inprocessing.
     * At each "restart", if the proportion is below this ratio, we will do some
     * inprocessing, otherwise, we skip it for this restart.
     *
     * @generated from field: optional double inprocessing_dtime_ratio = 273 [default = 0.2];
     */
    inprocessingDtimeRatio: number;
    /**
     * The amount of dtime we should spend on probing for each inprocessing round.
     *
     * @generated from field: optional double inprocessing_probing_dtime = 274 [default = 1];
     */
    inprocessingProbingDtime: number;
    /**
     * Parameters for an heuristic similar to the one described in "An effective
     * learnt clause minimization approach for CDCL Sat Solvers",
     * https://www.ijcai.org/proceedings/2017/0098.pdf
     *
     * This is the amount of dtime we should spend on this technique during each
     * inprocessing phase.
     *
     * The minimization technique is the same as the one used to minimize core in
     * max-sat. We also minimize problem clauses and not just the learned clause
     * that we keep forever like in the paper.
     *
     * @generated from field: optional double inprocessing_minimization_dtime = 275 [default = 1];
     */
    inprocessingMinimizationDtime: number;
    /**
     * @generated from field: optional bool inprocessing_minimization_use_conflict_analysis = 297 [default = true];
     */
    inprocessingMinimizationUseConflictAnalysis: boolean;
    /**
     * @generated from field: optional bool inprocessing_minimization_use_all_orderings = 298 [default = false];
     */
    inprocessingMinimizationUseAllOrderings: boolean;
    /**
     * Whether we use the algorithm described in "Clausal Congruence closure",
     * Armin Biere, Katalin Fazekas, Mathias Fleury, Nils Froleyks, 2024.
     *
     * Note that we only have a basic version currently.
     *
     * @generated from field: optional bool inprocessing_use_congruence_closure = 342 [default = true];
     */
    inprocessingUseCongruenceClosure: boolean;
    /**
     * Whether we use the SAT sweeping algorithm described in "Clausal Equivalence
     * Sweeping", Armin Biere, Katalin Fazekas, Mathias Fleury, Nils Froleyks,
     * 2025.
     *
     * @generated from field: optional bool inprocessing_use_sat_sweeping = 354 [default = false];
     */
    inprocessingUseSatSweeping: boolean;
    /**
     * Specify the number of parallel workers (i.e. threads) to use during search.
     * This should usually be lower than your number of available cpus +
     * hyperthread in your machine.
     *
     * A value of 0 means the solver will try to use all cores on the machine.
     * A number of 1 means no parallelism.
     *
     * Note that 'num_workers' is the preferred name, but if it is set to zero,
     * we will still read the deprecated 'num_search_workers'.
     *
     * As of 2020-04-10, if you're using SAT via MPSolver (to solve integer
     * programs) this field is overridden with a value of 8, if the field is not
     * set *explicitly*. Thus, always set this field explicitly or via
     * MPSolver::SetNumThreads().
     *
     * @generated from field: optional int32 num_workers = 206 [default = 0];
     */
    numWorkers: number;
    /**
     * @generated from field: optional int32 num_search_workers = 100 [default = 0];
     */
    numSearchWorkers: number;
    /**
     * We distinguish subsolvers that consume a full thread, and the ones that are
     * always interleaved. If left at zero, we will fix this with a default
     * formula that depends on num_workers. But if you start modifying what runs,
     * you might want to fix that to a given value depending on the num_workers
     * you use.
     *
     * @generated from field: optional int32 num_full_subsolvers = 294 [default = 0];
     */
    numFullSubsolvers: number;
    /**
     * In multi-thread, the solver can be mainly seen as a portfolio of solvers
     * with different parameters. This field indicates the names of the parameters
     * that are used in multithread. This only applies to "full" subsolvers.
     *
     * See cp_model_search.cc to see a list of the names and the default value (if
     * left empty) that looks like:
     * - default_lp           (linearization_level:1)
     * - fixed                (only if fixed search specified or scheduling)
     * - no_lp                (linearization_level:0)
     * - max_lp               (linearization_level:2)
     * - pseudo_costs         (only if objective, change search heuristic)
     * - reduced_costs        (only if objective, change search heuristic)
     * - quick_restart        (kind of probing)
     * - quick_restart_no_lp  (kind of probing with linearization_level:0)
     * - lb_tree_search       (to improve lower bound, MIP like tree search)
     * - probing              (continuous probing and shaving)
     *
     * Also, note that some set of parameters will be ignored if they do not make
     * sense. For instance if there is no objective, pseudo_cost or reduced_cost
     * search will be ignored. Core based search will only work if the objective
     * has many terms. If there is no fixed strategy fixed will be ignored. And so
     * on.
     *
     * The order is important, as only the first num_full_subsolvers will be
     * scheduled. You can see in the log which one are selected for a given run.
     *
     * @generated from field: repeated string subsolvers = 207;
     */
    subsolvers: string[];
    /**
     * A convenient way to add more workers types.
     * These will be added at the beginning of the list.
     *
     * @generated from field: repeated string extra_subsolvers = 219;
     */
    extraSubsolvers: string[];
    /**
     * Rather than fully specifying subsolvers, it is often convenient to just
     * remove the ones that are not useful on a given problem or only keep
     * specific ones for testing. Each string is interpreted as a "glob", so we
     * support '*' and '?'.
     *
     * The way this work is that we will only accept a name that match a filter
     * pattern (if non-empty) and do not match an ignore pattern. Note also that
     * these fields work on LNS or LS names even if these are currently not
     * specified via the subsolvers field.
     *
     * @generated from field: repeated string ignore_subsolvers = 209;
     */
    ignoreSubsolvers: string[];
    /**
     * @generated from field: repeated string filter_subsolvers = 293;
     */
    filterSubsolvers: string[];
    /**
     * It is possible to specify additional subsolver configuration. These can be
     * referred by their params.name() in the fields above. Note that only the
     * specified field will "overwrite" the ones of the base parameter. If a
     * subsolver_params has the name of an existing subsolver configuration, the
     * named parameters will be merged into the subsolver configuration.
     *
     * @generated from field: repeated operations_research.sat.SatParameters subsolver_params = 210;
     */
    subsolverParams: SatParameters[];
    /**
     * Experimental. If this is true, then we interleave all our major search
     * strategy and distribute the work amongst num_workers.
     *
     * The search is deterministic (independently of num_workers!), and we
     * schedule and wait for interleave_batch_size task to be completed before
     * synchronizing and scheduling the next batch of tasks.
     *
     * @generated from field: optional bool interleave_search = 136 [default = false];
     */
    interleaveSearch: boolean;
    /**
     * @generated from field: optional int32 interleave_batch_size = 134 [default = 0];
     */
    interleaveBatchSize: number;
    /**
     * Allows objective sharing between workers.
     *
     * @generated from field: optional bool share_objective_bounds = 113 [default = true];
     */
    shareObjectiveBounds: boolean;
    /**
     * Allows sharing of the bounds of modified variables at level 0.
     *
     * @generated from field: optional bool share_level_zero_bounds = 114 [default = true];
     */
    shareLevelZeroBounds: boolean;
    /**
     * Allows sharing of the bounds on linear2 discovered at level 0. This is
     * mainly interesting on scheduling type of problems when we branch on
     * precedences.
     *
     * Warning: This currently non-deterministic.
     *
     * @generated from field: optional bool share_linear2_bounds = 326 [default = false];
     */
    shareLinear2Bounds: boolean;
    /**
     * Allows sharing of new learned binary clause between workers.
     *
     * @generated from field: optional bool share_binary_clauses = 203 [default = true];
     */
    shareBinaryClauses: boolean;
    /**
     * Allows sharing of short glue clauses between workers.
     * Implicitly disabled if share_binary_clauses is false.
     *
     * @generated from field: optional bool share_glue_clauses = 285 [default = true];
     */
    shareGlueClauses: boolean;
    /**
     * Minimize and detect subsumption of shared clauses immediately after they
     * are imported.
     *
     * @generated from field: optional bool minimize_shared_clauses = 300 [default = true];
     */
    minimizeSharedClauses: boolean;
    /**
     * The amount of dtime between each export of shared glue clauses.
     *
     * @generated from field: optional double share_glue_clauses_dtime = 322 [default = 1];
     */
    shareGlueClausesDtime: number;
    /**
     * If true, inferred clauses are checked with an LRAT checker as they are
     * learned, in presolve (reduced to trivial simplifications if
     * cp_model_presolve is false), and in each worker. As of December 2025, this
     * only works with pure SAT problems, with
     *  - cp_model_presolve = false,
     *  - linearization_level <= 1,
     *  - symmetry_level <= 1.
     *
     * @generated from field: optional bool check_lrat_proof = 344 [default = false];
     */
    checkLratProof: boolean;
    /**
     * If true, and if output_lrat_proof is true and the problem is UNSAT, check
     * that the merged proof file is valid, i.e., that clause sharing between
     * workers is correct. This checks each inferred clause, so you might want to
     * disable check_lrat_proof to avoid redundant work. As of November 2025, this
     * only works for pure SAT problems, with num_workers = 1.
     *
     * @generated from field: optional bool check_merged_lrat_proof = 352 [default = false];
     */
    checkMergedLratProof: boolean;
    /**
     * If true, an LRAT proof that all the clauses inferred by the solver are
     * valid is output to several files (one for presolve -- reduced to trivial
     * simplifications if cp_model_presolve is false, one per worker, and one for
     * the merged proof). As of December 2025, this only works for pure SAT
     * problems, with
     *  - cp_model_presolve = false,
     *  - linearization_level <= 1,
     *  - symmetry_level <= 1.
     *
     * @generated from field: optional bool output_lrat_proof = 345 [default = false];
     */
    outputLratProof: boolean;
    /**
     * If true, and if the problem is UNSAT, a DRAT proof of this UNSAT property
     * is checked after the solver has finished. As of November 2025, this only
     * works for pure SAT problems, with
     *  - num_workers = 1,
     *  - cp_model_presolve = false,
     *  - linearization_level <= 1,
     *  - symmetry_level <= 1.
     *
     * @generated from field: optional bool check_drat_proof = 346 [default = false];
     */
    checkDratProof: boolean;
    /**
     * If true, a DRAT proof that all the clauses inferred by the solver are valid
     * is output to a file. As of December 2025, this only works for pure SAT
     * problems, with
     *  - num_workers = 1,
     *  - cp_model_presolve = false,
     *  - linearization_level <= 1,
     *  - symmetry_level <= 1.
     *
     * @generated from field: optional bool output_drat_proof = 347 [default = false];
     */
    outputDratProof: boolean;
    /**
     * The maximum time allowed to check the DRAT proof (this can take more time
     * than the solve itself). Only used if check_drat_proof is true.
     *
     * @generated from field: optional double max_drat_time_in_seconds = 348 [default = inf];
     */
    maxDratTimeInSeconds: number;
    /**
     * We have two different postsolve code. The default one should be better and
     * it allows for a more powerful presolve, but it can be useful to postsolve
     * using the full solver instead.
     *
     * @generated from field: optional bool debug_postsolve_with_full_solver = 162 [default = false];
     */
    debugPostsolveWithFullSolver: boolean;
    /**
     * If positive, try to stop just after that many presolve rules have been
     * applied. This is mainly useful for debugging presolve.
     *
     * @generated from field: optional int32 debug_max_num_presolve_operations = 151 [default = 0];
     */
    debugMaxNumPresolveOperations: number;
    /**
     * Crash if we do not manage to complete the hint into a full solution.
     *
     * @generated from field: optional bool debug_crash_on_bad_hint = 195 [default = false];
     */
    debugCrashOnBadHint: boolean;
    /**
     * Crash if presolve breaks a feasible hint.
     *
     * @generated from field: optional bool debug_crash_if_presolve_breaks_hint = 306 [default = false];
     */
    debugCrashIfPresolveBreaksHint: boolean;
    /**
     * Crash if the LRAT UNSAT proof is invalid.
     *
     * @generated from field: optional bool debug_crash_if_lrat_check_fails = 339 [default = false];
     */
    debugCrashIfLratCheckFails: boolean;
    /**
     * For an optimization problem, whether we follow some hints in order to find
     * a better first solution. For a variable with hint, the solver will always
     * try to follow the hint. It will revert to the variable_branching default
     * otherwise.
     *
     * @generated from field: optional bool use_optimization_hints = 35 [default = true];
     */
    useOptimizationHints: boolean;
    /**
     * If positive, we spend some effort on each core:
     * - At level 1, we use a simple heuristic to try to minimize an UNSAT core.
     * - At level 2, we use propagation to minimize the core but also identify
     *   literal in at most one relationship in this core.
     *
     * @generated from field: optional int32 core_minimization_level = 50 [default = 2];
     */
    coreMinimizationLevel: number;
    /**
     * Whether we try to find more independent cores for a given set of
     * assumptions in the core based max-SAT algorithms.
     *
     * @generated from field: optional bool find_multiple_cores = 84 [default = true];
     */
    findMultipleCores: boolean;
    /**
     * If true, when the max-sat algo find a core, we compute the minimal number
     * of literals in the core that needs to be true to have a feasible solution.
     * This is also called core exhaustion in more recent max-SAT papers.
     *
     * @generated from field: optional bool cover_optimization = 89 [default = true];
     */
    coverOptimization: boolean;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.MaxSatAssumptionOrder max_sat_assumption_order = 51 [default = DEFAULT_ASSUMPTION_ORDER];
     */
    maxSatAssumptionOrder: SatParameters_MaxSatAssumptionOrder;
    /**
     * If true, adds the assumption in the reverse order of the one defined by
     * max_sat_assumption_order.
     *
     * @generated from field: optional bool max_sat_reverse_assumption_order = 52 [default = false];
     */
    maxSatReverseAssumptionOrder: boolean;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.MaxSatStratificationAlgorithm max_sat_stratification = 53 [default = STRATIFICATION_DESCENT];
     */
    maxSatStratification: SatParameters_MaxSatStratificationAlgorithm;
    /**
     * Some search decisions might cause a really large number of propagations to
     * happen when integer variables with large domains are only reduced by 1 at
     * each step. If we propagate more than the number of variable times this
     * parameters we try to take counter-measure. Setting this to 0.0 disable this
     * feature.
     *
     * TODO(user): Setting this to something like 10 helps in most cases, but the
     * code is currently buggy and can cause the solve to enter a bad state where
     * no progress is made.
     *
     * @generated from field: optional double propagation_loop_detection_factor = 221 [default = 10];
     */
    propagationLoopDetectionFactor: number;
    /**
     * When this is true, then a disjunctive constraint will try to use the
     * precedence relations between time intervals to propagate their bounds
     * further. For instance if task A and B are both before C and task A and B
     * are in disjunction, then we can deduce that task C must start after
     * duration(A) + duration(B) instead of simply max(duration(A), duration(B)),
     * provided that the start time for all task was currently zero.
     *
     * This always result in better propagation, but it is usually slow, so
     * depending on the problem, turning this off may lead to a faster solution.
     *
     * @generated from field: optional bool use_precedences_in_disjunctive_constraint = 74 [default = true];
     */
    usePrecedencesInDisjunctiveConstraint: boolean;
    /**
     * At root level, we might compute the transitive closure of "precedences"
     * relations so that we can exploit that in scheduling problems. Setting this
     * to zero disable the feature.
     *
     * @generated from field: optional int32 transitive_precedences_work_limit = 327 [default = 1000000];
     */
    transitivePrecedencesWorkLimit: number;
    /**
     * Create one literal for each disjunction of two pairs of tasks. This slows
     * down the solve time, but improves the lower bound of the objective in the
     * makespan case. This will be triggered if the number of intervals is less or
     * equal than the parameter and if use_strong_propagation_in_disjunctive is
     * true.
     *
     * @generated from field: optional int32 max_size_to_create_precedence_literals_in_disjunctive = 229 [default = 60];
     */
    maxSizeToCreatePrecedenceLiteralsInDisjunctive: number;
    /**
     * Enable stronger and more expensive propagation on no_overlap constraint.
     *
     * @generated from field: optional bool use_strong_propagation_in_disjunctive = 230 [default = false];
     */
    useStrongPropagationInDisjunctive: boolean;
    /**
     * Whether we try to branch on decision "interval A before interval B" rather
     * than on intervals bounds. This usually works better, but slow down a bit
     * the time to find the first solution.
     *
     * These parameters are still EXPERIMENTAL, the result should be correct, but
     * it some corner cases, they can cause some failing CHECK in the solver.
     *
     * @generated from field: optional bool use_dynamic_precedence_in_disjunctive = 263 [default = false];
     */
    useDynamicPrecedenceInDisjunctive: boolean;
    /**
     * @generated from field: optional bool use_dynamic_precedence_in_cumulative = 268 [default = false];
     */
    useDynamicPrecedenceInCumulative: boolean;
    /**
     * When this is true, the cumulative constraint is reinforced with overload
     * checking, i.e., an additional level of reasoning based on energy. This
     * additional level supplements the default level of reasoning as well as
     * timetable edge finding.
     *
     * This always result in better propagation, but it is usually slow, so
     * depending on the problem, turning this off may lead to a faster solution.
     *
     * @generated from field: optional bool use_overload_checker_in_cumulative = 78 [default = false];
     */
    useOverloadCheckerInCumulative: boolean;
    /**
     * Enable a heuristic to solve cumulative constraints using a modified energy
     * constraint. We modify the usual energy definition by applying a
     * super-additive function (also called "conservative scale" or "dual-feasible
     * function") to the demand and the durations of the tasks.
     *
     * This heuristic is fast but for most problems it does not help much to find
     * a solution.
     *
     * @generated from field: optional bool use_conservative_scale_overload_checker = 286 [default = false];
     */
    useConservativeScaleOverloadChecker: boolean;
    /**
     * When this is true, the cumulative constraint is reinforced with timetable
     * edge finding, i.e., an additional level of reasoning based on the
     * conjunction of energy and mandatory parts. This additional level
     * supplements the default level of reasoning as well as overload_checker.
     *
     * This always result in better propagation, but it is usually slow, so
     * depending on the problem, turning this off may lead to a faster solution.
     *
     * @generated from field: optional bool use_timetable_edge_finding_in_cumulative = 79 [default = false];
     */
    useTimetableEdgeFindingInCumulative: boolean;
    /**
     * Max number of intervals for the timetable_edge_finding algorithm to
     * propagate. A value of 0 disables the constraint.
     *
     * @generated from field: optional int32 max_num_intervals_for_timetable_edge_finding = 260 [default = 100];
     */
    maxNumIntervalsForTimetableEdgeFinding: number;
    /**
     * If true, detect and create constraint for integer variable that are "after"
     * a set of intervals in the same cumulative constraint.
     *
     * Experimental: by default we just use "direct" precedences. If
     * exploit_all_precedences is true, we explore the full precedence graph. This
     * assumes we have a DAG otherwise it fails.
     *
     * @generated from field: optional bool use_hard_precedences_in_cumulative = 215 [default = false];
     */
    useHardPrecedencesInCumulative: boolean;
    /**
     * @generated from field: optional bool exploit_all_precedences = 220 [default = false];
     */
    exploitAllPrecedences: boolean;
    /**
     * When this is true, the cumulative constraint is reinforced with propagators
     * from the disjunctive constraint to improve the inference on a set of tasks
     * that are disjunctive at the root of the problem. This additional level
     * supplements the default level of reasoning.
     *
     * Propagators of the cumulative constraint will not be used at all if all the
     * tasks are disjunctive at root node.
     *
     * This always result in better propagation, but it is usually slow, so
     * depending on the problem, turning this off may lead to a faster solution.
     *
     * @generated from field: optional bool use_disjunctive_constraint_in_cumulative = 80 [default = true];
     */
    useDisjunctiveConstraintInCumulative: boolean;
    /**
     * If less than this number of boxes are present in a no-overlap 2d, we
     * create 4 Booleans per pair of boxes:
     * - Box 2 is after Box 1 on x.
     * - Box 1 is after Box 2 on x.
     * - Box 2 is after Box 1 on y.
     * - Box 1 is after Box 2 on y.
     *
     * Note that at least one of them must be true, and at most one on x and one
     * on y can be true.
     *
     * This can significantly help in closing small problem. The SAT reasoning
     * can be a lot more powerful when we take decision on such positional
     * relations.
     *
     * @generated from field: optional int32 no_overlap_2d_boolean_relations_limit = 321 [default = 10];
     */
    noOverlap2dBooleanRelationsLimit: number;
    /**
     * When this is true, the no_overlap_2d constraint is reinforced with
     * propagators from the cumulative constraints. It consists of ignoring the
     * position of rectangles in one position and projecting the no_overlap_2d on
     * the other dimension to create a cumulative constraint. This is done on both
     * axis. This additional level supplements the default level of reasoning.
     *
     * @generated from field: optional bool use_timetabling_in_no_overlap_2d = 200 [default = false];
     */
    useTimetablingInNoOverlap2d: boolean;
    /**
     * When this is true, the no_overlap_2d constraint is reinforced with
     * energetic reasoning. This additional level supplements the default level of
     * reasoning.
     *
     * @generated from field: optional bool use_energetic_reasoning_in_no_overlap_2d = 213 [default = false];
     */
    useEnergeticReasoningInNoOverlap2d: boolean;
    /**
     * When this is true, the no_overlap_2d constraint is reinforced with
     * an energetic reasoning that uses an area-based energy. This can be combined
     * with the two other overlap heuristics above.
     *
     * @generated from field: optional bool use_area_energetic_reasoning_in_no_overlap_2d = 271 [default = false];
     */
    useAreaEnergeticReasoningInNoOverlap2d: boolean;
    /**
     * @generated from field: optional bool use_try_edge_reasoning_in_no_overlap_2d = 299 [default = false];
     */
    useTryEdgeReasoningInNoOverlap2d: boolean;
    /**
     * If the number of pairs to look is below this threshold, do an extra step of
     * propagation in the no_overlap_2d constraint by looking at all pairs of
     * intervals.
     *
     * @generated from field: optional int32 max_pairs_pairwise_reasoning_in_no_overlap_2d = 276 [default = 1250];
     */
    maxPairsPairwiseReasoningInNoOverlap2d: number;
    /**
     * Detects when the space where items of a no_overlap_2d constraint can placed
     * is disjoint (ie., fixed boxes split the domain). When it is the case, we
     * can introduce a boolean for each pair <item, component> encoding whether
     * the item is in the component or not. Then we replace the original
     * no_overlap_2d constraint by one no_overlap_2d constraint for each
     * component, with the new booleans as the enforcement_literal of the
     * intervals. This is equivalent to expanding the original no_overlap_2d
     * constraint into a bin packing problem with each connected component being a
     * bin. This heuristic is only done when the number of regions to split
     * is less than this parameter and <= 1 disables it.
     *
     * @generated from field: optional int32 maximum_regions_to_split_in_disconnected_no_overlap_2d = 315 [default = 0];
     */
    maximumRegionsToSplitInDisconnectedNoOverlap2d: number;
    /**
     * When set, this activates a propagator for the no_overlap_2d constraint that
     * uses any eventual linear constraints of the model in the form
     * `{start interval 1} - {end interval 2} + c*w <= ub` to detect that two
     * intervals must overlap in one dimension for some values of `w`. This is
     * particularly useful for problems where the distance between two boxes is
     * part of the model.
     *
     * @generated from field: optional bool use_linear3_for_no_overlap_2d_precedences = 323 [default = true];
     */
    useLinear3ForNoOverlap2dPrecedences: boolean;
    /**
     * When set, it activates a few scheduling parameters to improve the lower
     * bound of scheduling problems. This is only effective with multiple workers
     * as it modifies the reduced_cost, lb_tree_search, and probing workers.
     *
     * @generated from field: optional bool use_dual_scheduling_heuristics = 214 [default = true];
     */
    useDualSchedulingHeuristics: boolean;
    /**
     * Turn on extra propagation for the circuit constraint.
     * This can be quite slow.
     *
     * @generated from field: optional bool use_all_different_for_circuit = 311 [default = false];
     */
    useAllDifferentForCircuit: boolean;
    /**
     * If the size of a subset of nodes of a RoutesConstraint is less than this
     * value, use linear constraints of size 1 and 2 (such as capacity and time
     * window constraints) enforced by the arc literals to compute cuts for this
     * subset (unless the subset size is less than
     * routing_cut_subset_size_for_tight_binary_relation_bound, in which case the
     * corresponding algorithm is used instead). The algorithm for these cuts has
     * a O(n^3) complexity, where n is the subset size. Hence the value of this
     * parameter should not be too large (e.g. 10 or 20).
     *
     * @generated from field: optional int32 routing_cut_subset_size_for_binary_relation_bound = 312 [default = 0];
     */
    routingCutSubsetSizeForBinaryRelationBound: number;
    /**
     * Similar to above, but with a different algorithm producing better cuts, at
     * the price of a higher O(2^n) complexity, where n is the subset size. Hence
     * the value of this parameter should be small (e.g. less than 10).
     *
     * @generated from field: optional int32 routing_cut_subset_size_for_tight_binary_relation_bound = 313 [default = 0];
     */
    routingCutSubsetSizeForTightBinaryRelationBound: number;
    /**
     * Similar to above, but with an even stronger algorithm in O(n!). We try to
     * be defensive and abort early or not run that often. Still the value of
     * that parameter shouldn't really be much more than 10.
     *
     * @generated from field: optional int32 routing_cut_subset_size_for_exact_binary_relation_bound = 316 [default = 8];
     */
    routingCutSubsetSizeForExactBinaryRelationBound: number;
    /**
     * Similar to routing_cut_subset_size_for_exact_binary_relation_bound but
     * use a bound based on shortest path distances (which respect triangular
     * inequality). This allows to derive bounds that are valid for any superset
     * of a given subset. This is slow, so it shouldn't really be larger than 10.
     *
     * @generated from field: optional int32 routing_cut_subset_size_for_shortest_paths_bound = 318 [default = 8];
     */
    routingCutSubsetSizeForShortestPathsBound: number;
    /**
     * The amount of "effort" to spend in dynamic programming for computing
     * routing cuts. This is in term of basic operations needed by the algorithm
     * in the worst case, so a value like 1e8 should take less than a second to
     * compute.
     *
     * @generated from field: optional double routing_cut_dp_effort = 314 [default = 1e+07];
     */
    routingCutDpEffort: number;
    /**
     * If the length of an infeasible path is less than this value, a cut will be
     * added to exclude it.
     *
     * @generated from field: optional int32 routing_cut_max_infeasible_path_length = 317 [default = 6];
     */
    routingCutMaxInfeasiblePathLength: number;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.SearchBranching search_branching = 82 [default = AUTOMATIC_SEARCH];
     */
    searchBranching: SatParameters_SearchBranching;
    /**
     * Conflict limit used in the phase that exploit the solution hint.
     *
     * @generated from field: optional int32 hint_conflict_limit = 153 [default = 10];
     */
    hintConflictLimit: number;
    /**
     * If true, the solver tries to repair the solution given in the hint. This
     * search terminates after the 'hint_conflict_limit' is reached and the solver
     * switches to regular search. If false, then  we do a FIXED_SEARCH using the
     * hint until the hint_conflict_limit is reached.
     *
     * @generated from field: optional bool repair_hint = 167 [default = false];
     */
    repairHint: boolean;
    /**
     * If true, variables appearing in the solution hints will be fixed to their
     * hinted value.
     *
     * @generated from field: optional bool fix_variables_to_their_hinted_value = 192 [default = false];
     */
    fixVariablesToTheirHintedValue: boolean;
    /**
     * If true, search will continuously probe Boolean variables, and integer
     * variable bounds. This parameter is set to true in parallel on the probing
     * worker.
     *
     * @generated from field: optional bool use_probing_search = 176 [default = false];
     */
    useProbingSearch: boolean;
    /**
     * Use extended probing (probe bool_or, at_most_one, exactly_one).
     *
     * @generated from field: optional bool use_extended_probing = 269 [default = true];
     */
    useExtendedProbing: boolean;
    /**
     * How many combinations of pairs or triplets of variables we want to scan.
     *
     * @generated from field: optional int32 probing_num_combinations_limit = 272 [default = 20000];
     */
    probingNumCombinationsLimit: number;
    /**
     * Add a shaving phase (where the solver tries to prove that the lower or
     * upper bound of a variable are infeasible) to the probing search. (<= 0
     * disables it).
     *
     * @generated from field: optional double shaving_deterministic_time_in_probing_search = 204 [default = 0.001];
     */
    shavingDeterministicTimeInProbingSearch: number;
    /**
     * Specifies the amount of deterministic time spent of each try at shaving a
     * bound in the shaving search.
     *
     * @generated from field: optional double shaving_search_deterministic_time = 205 [default = 0.1];
     */
    shavingSearchDeterministicTime: number;
    /**
     * Specifies the threshold between two modes in the shaving procedure.
     * If the range of the variable/objective is less than this threshold, then
     * the shaving procedure will try to remove values one by one. Otherwise, it
     * will try to remove one range at a time.
     *
     * @generated from field: optional int64 shaving_search_threshold = 290 [default = 64];
     */
    shavingSearchThreshold: bigint;
    /**
     * If true, search will search in ascending max objective value (when
     * minimizing) starting from the lower bound of the objective.
     *
     * @generated from field: optional bool use_objective_lb_search = 228 [default = false];
     */
    useObjectiveLbSearch: boolean;
    /**
     * This search differs from the previous search as it will not use assumptions
     * to bound the objective, and it will recreate a full model with the
     * hardcoded objective value.
     *
     * @generated from field: optional bool use_objective_shaving_search = 253 [default = false];
     */
    useObjectiveShavingSearch: boolean;
    /**
     * This search takes all Boolean or integer variables, and maximize or
     * minimize them in order to reduce their domain. -1 is automatic, otherwise
     * value 0 disables it, and 1, 2, or 3 changes something.
     *
     * @generated from field: optional int32 variables_shaving_level = 289 [default = -1];
     */
    variablesShavingLevel: number;
    /**
     * The solver ignores the pseudo costs of variables with number of recordings
     * less than this threshold.
     *
     * @generated from field: optional int64 pseudo_cost_reliability_threshold = 123 [default = 100];
     */
    pseudoCostReliabilityThreshold: bigint;
    /**
     * The default optimization method is a simple "linear scan", each time trying
     * to find a better solution than the previous one. If this is true, then we
     * use a core-based approach (like in max-SAT) when we try to increase the
     * lower bound instead.
     *
     * @generated from field: optional bool optimize_with_core = 83 [default = false];
     */
    optimizeWithCore: boolean;
    /**
     * Do a more conventional tree search (by opposition to SAT based one) where
     * we keep all the explored node in a tree. This is meant to be used in a
     * portfolio and focus on improving the objective lower bound. Keeping the
     * whole tree allow us to report a better objective lower bound coming from
     * the worst open node in the tree.
     *
     * @generated from field: optional bool optimize_with_lb_tree_search = 188 [default = false];
     */
    optimizeWithLbTreeSearch: boolean;
    /**
     * Experimental. Save the current LP basis at each node of the search tree so
     * that when we jump around, we can load it and reduce the number of LP
     * iterations needed.
     *
     * It currently works okay if we do not change the lp with cuts or
     * simplification... More work is needed to make it robust in all cases.
     *
     * @generated from field: optional bool save_lp_basis_in_lb_tree_search = 284 [default = false];
     */
    saveLpBasisInLbTreeSearch: boolean;
    /**
     * If non-negative, perform a binary search on the objective variable in order
     * to find an [min, max] interval outside of which the solver proved unsat/sat
     * under this amount of conflict. This can quickly reduce the objective domain
     * on some problems.
     *
     * @generated from field: optional int32 binary_search_num_conflicts = 99 [default = -1];
     */
    binarySearchNumConflicts: number;
    /**
     * This has no effect if optimize_with_core is false. If true, use a different
     * core-based algorithm similar to the max-HS algo for max-SAT. This is a
     * hybrid MIP/CP approach and it uses a MIP solver in addition to the CP/SAT
     * one. This is also related to the PhD work of tobyodavies@
     * "Automatic Logic-Based Benders Decomposition with MiniZinc"
     * http://aaai.org/ocs/index.php/AAAI/AAAI17/paper/view/14489
     *
     * @generated from field: optional bool optimize_with_max_hs = 85 [default = false];
     */
    optimizeWithMaxHs: boolean;
    /**
     * Parameters for an heuristic similar to the one described in the paper:
     * "Feasibility Jump: an LP-free Lagrangian MIP heuristic", Bjørnar
     * Luteberget, Giorgio Sartor, 2023, Mathematical Programming Computation.
     *
     * @generated from field: optional bool use_feasibility_jump = 265 [default = true];
     */
    useFeasibilityJump: boolean;
    /**
     * Disable every other type of subsolver, setting this turns CP-SAT into a
     * pure local-search solver.
     *
     * @generated from field: optional bool use_ls_only = 240 [default = false];
     */
    useLsOnly: boolean;
    /**
     * On each restart, we randomly choose if we use decay (with this parameter)
     * or no decay.
     *
     * @generated from field: optional double feasibility_jump_decay = 242 [default = 0.95];
     */
    feasibilityJumpDecay: number;
    /**
     * How much do we linearize the problem in the local search code.
     *
     * @generated from field: optional int32 feasibility_jump_linearization_level = 257 [default = 2];
     */
    feasibilityJumpLinearizationLevel: number;
    /**
     * This is a factor that directly influence the work before each restart.
     * Increasing it leads to longer restart.
     *
     * @generated from field: optional int32 feasibility_jump_restart_factor = 258 [default = 1];
     */
    feasibilityJumpRestartFactor: number;
    /**
     * How much dtime for each LS batch.
     *
     * @generated from field: optional double feasibility_jump_batch_dtime = 292 [default = 0.1];
     */
    feasibilityJumpBatchDtime: number;
    /**
     * Probability for a variable to have a non default value upon restarts or
     * perturbations.
     *
     * @generated from field: optional double feasibility_jump_var_randomization_probability = 247 [default = 0.05];
     */
    feasibilityJumpVarRandomizationProbability: number;
    /**
     * Max distance between the default value and the pertubated value relative to
     * the range of the domain of the variable.
     *
     * @generated from field: optional double feasibility_jump_var_perburbation_range_ratio = 248 [default = 0.2];
     */
    feasibilityJumpVarPerburbationRangeRatio: number;
    /**
     * When stagnating, feasibility jump will either restart from a default
     * solution (with some possible randomization), or randomly pertubate the
     * current solution. This parameter selects the first option.
     *
     * @generated from field: optional bool feasibility_jump_enable_restarts = 250 [default = true];
     */
    feasibilityJumpEnableRestarts: boolean;
    /**
     * Maximum size of no_overlap or no_overlap_2d constraint for a quadratic
     * expansion. This might look a lot, but by expanding such constraint, we get
     * a linear time evaluation per single variable moves instead of a slow O(n
     * log n) one.
     *
     * @generated from field: optional int32 feasibility_jump_max_expanded_constraint_size = 264 [default = 500];
     */
    feasibilityJumpMaxExpandedConstraintSize: number;
    /**
     * This will create incomplete subsolvers (that are not LNS subsolvers)
     * that use the feasibility jump code to find improving solution, treating
     * the objective improvement as a hard constraint.
     *
     * @generated from field: optional int32 num_violation_ls = 244 [default = 0];
     */
    numViolationLs: number;
    /**
     * How long violation_ls should wait before perturbating a solution.
     *
     * @generated from field: optional int32 violation_ls_perturbation_period = 249 [default = 100];
     */
    violationLsPerturbationPeriod: number;
    /**
     * Probability of using compound move search each restart.
     * TODO(user): Add reference to paper when published.
     *
     * @generated from field: optional double violation_ls_compound_move_probability = 259 [default = 0.5];
     */
    violationLsCompoundMoveProbability: number;
    /**
     * Enables shared tree search.
     * If positive, start this many complete worker threads to explore a shared
     * search tree. These workers communicate objective bounds and simple decision
     * nogoods relating to the shared prefix of the tree, and will avoid exploring
     * the same subtrees as one another.
     * Specifying a negative number uses a heuristic to select an appropriate
     * number of shared tree workeres based on the total number of workers.
     *
     * @generated from field: optional int32 shared_tree_num_workers = 235 [default = -1];
     */
    sharedTreeNumWorkers: number;
    /**
     * Set on shared subtree workers. Users should not set this directly.
     *
     * @generated from field: optional bool use_shared_tree_search = 236 [default = false];
     */
    useSharedTreeSearch: boolean;
    /**
     * Minimum restarts before a worker will replace a subtree
     * that looks "bad" based on the average LBD of learned clauses.
     *
     * @generated from field: optional int32 shared_tree_worker_min_restarts_per_subtree = 282 [default = 1];
     */
    sharedTreeWorkerMinRestartsPerSubtree: number;
    /**
     * If true, workers share more of the information from their local trail.
     * Specifically, literals implied by the shared tree decisions.
     *
     * @generated from field: optional bool shared_tree_worker_enable_trail_sharing = 295 [default = true];
     */
    sharedTreeWorkerEnableTrailSharing: boolean;
    /**
     * If true, shared tree workers share their target phase when returning an
     * assigned subtree for the next worker to use.
     *
     * @generated from field: optional bool shared_tree_worker_enable_phase_sharing = 304 [default = true];
     */
    sharedTreeWorkerEnablePhaseSharing: boolean;
    /**
     * How many open leaf nodes should the shared tree maintain per worker.
     *
     * @generated from field: optional double shared_tree_open_leaves_per_worker = 281 [default = 2];
     */
    sharedTreeOpenLeavesPerWorker: number;
    /**
     * In order to limit total shared memory and communication overhead, limit the
     * total number of nodes that may be generated in the shared tree. If the
     * shared tree runs out of unassigned leaves, workers act as portfolio
     * workers. Note: this limit includes interior nodes, not just leaves.
     *
     * @generated from field: optional int32 shared_tree_max_nodes_per_worker = 238 [default = 10000];
     */
    sharedTreeMaxNodesPerWorker: number;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.SharedTreeSplitStrategy shared_tree_split_strategy = 239 [default = SPLIT_STRATEGY_AUTO];
     */
    sharedTreeSplitStrategy: SatParameters_SharedTreeSplitStrategy;
    /**
     * How much deeper compared to the ideal max depth of the tree is considered
     * "balanced" enough to still accept a split. Without such a tolerance,
     * sometimes the tree can only be split by a single worker, and they may not
     * generate a split for some time. In contrast, with a tolerance of 1, at
     * least half of all workers should be able to split the tree as soon as a
     * split becomes required. This only has an effect on
     * SPLIT_STRATEGY_BALANCED_TREE and SPLIT_STRATEGY_DISCREPANCY.
     *
     * @generated from field: optional int32 shared_tree_balance_tolerance = 305 [default = 1];
     */
    sharedTreeBalanceTolerance: number;
    /**
     * How much dtime a worker will wait between proposing splits.
     * This limits the contention in splitting the shared tree, and also reduces
     * the number of too-easy subtrees that are generates.
     *
     * @generated from field: optional double shared_tree_split_min_dtime = 328 [default = 0.1];
     */
    sharedTreeSplitMinDtime: number;
    /**
     * Whether we enumerate all solutions of a problem without objective.
     *
     * WARNING:
     * - This can be used with num_workers > 1 but then each solutions can be
     *   found more than once, so it is up to the client to deduplicate them.
     * - If keep_all_feasible_solutions_in_presolve is unset, we will set it to
     *   true as otherwise, many feasible solution can just be removed by the
     *   presolve. It is still possible to manually set this to false if one only
     *   wants to enumerate all solutions of the presolved model.
     *
     * @generated from field: optional bool enumerate_all_solutions = 87 [default = false];
     */
    enumerateAllSolutions: boolean;
    /**
     * If true, we disable the presolve reductions that remove feasible solutions
     * from the search space. Such solution are usually dominated by a "better"
     * solution that is kept, but depending on the situation, we might want to
     * keep all solutions.
     *
     * A trivial example is when a variable is unused. If this is true, then the
     * presolve will not fix it to an arbitrary value and it will stay in the
     * search space.
     *
     * @generated from field: optional bool keep_all_feasible_solutions_in_presolve = 173 [default = false];
     */
    keepAllFeasibleSolutionsInPresolve: boolean;
    /**
     * If true, add information about the derived variable domains to the
     * CpSolverResponse. It is an option because it makes the response slighly
     * bigger and there is a bit more work involved during the postsolve to
     * construct it, but it should still have a low overhead. See the
     * tightened_variables field in CpSolverResponse for more details.
     *
     * @generated from field: optional bool fill_tightened_domains_in_response = 132 [default = false];
     */
    fillTightenedDomainsInResponse: boolean;
    /**
     * If true, the final response addition_solutions field will be filled with
     * all solutions from our solutions pool.
     *
     * Note that if both this field and enumerate_all_solutions is true, we will
     * copy to the pool all of the solution found. So if solution_pool_size is big
     * enough, you can get all solutions this way instead of using the solution
     * callback.
     *
     * Note that this only affect the "final" solution, not the one passed to the
     * solution callbacks.
     *
     * @generated from field: optional bool fill_additional_solutions_in_response = 194 [default = false];
     */
    fillAdditionalSolutionsInResponse: boolean;
    /**
     * If true, the solver will add a default integer branching strategy to the
     * already defined search strategy. If not, some variable might still not be
     * fixed at the end of the search. For now we assume these variable can just
     * be set to their lower bound.
     *
     * @generated from field: optional bool instantiate_all_variables = 106 [default = true];
     */
    instantiateAllVariables: boolean;
    /**
     * If true, then the precedences propagator try to detect for each variable if
     * it has a set of "optional incoming arc" for which at least one of them is
     * present. This is usually useful to have but can be slow on model with a lot
     * of precedence.
     *
     * @generated from field: optional bool auto_detect_greater_than_at_least_one_of = 95 [default = true];
     */
    autoDetectGreaterThanAtLeastOneOf: boolean;
    /**
     * For an optimization problem, stop the solver as soon as we have a solution.
     *
     * @generated from field: optional bool stop_after_first_solution = 98 [default = false];
     */
    stopAfterFirstSolution: boolean;
    /**
     * Mainly used when improving the presolver. When true, stops the solver after
     * the presolve is complete (or after loading and root level propagation).
     *
     * @generated from field: optional bool stop_after_presolve = 149 [default = false];
     */
    stopAfterPresolve: boolean;
    /**
     * @generated from field: optional bool stop_after_root_propagation = 252 [default = false];
     */
    stopAfterRootPropagation: boolean;
    /**
     * Initial parameters for neighborhood generation.
     *
     * @generated from field: optional double lns_initial_difficulty = 307 [default = 0.5];
     */
    lnsInitialDifficulty: number;
    /**
     * @generated from field: optional double lns_initial_deterministic_limit = 308 [default = 0.1];
     */
    lnsInitialDeterministicLimit: number;
    /**
     * Testing parameters used to disable all lns workers.
     *
     * @generated from field: optional bool use_lns = 283 [default = true];
     */
    useLns: boolean;
    /**
     * Experimental parameters to disable everything but lns.
     *
     * @generated from field: optional bool use_lns_only = 101 [default = false];
     */
    useLnsOnly: boolean;
    /**
     * Size of the top-n different solutions kept by the solver.
     * This parameter must be > 0. Currently, having this larger than one mainly
     * impact the "base" solution chosen for a LNS/LS fragment.
     *
     * @generated from field: optional int32 solution_pool_size = 193 [default = 3];
     */
    solutionPoolSize: number;
    /**
     * If solution_pool_size is <= this, we will use DP to keep a "diverse" set
     * of solutions (the one further apart via hamming distance) in the pool.
     * Setting this to large value might be slow, especially if your solution are
     * large.
     *
     * @generated from field: optional int32 solution_pool_diversity_limit = 329 [default = 10];
     */
    solutionPoolDiversityLimit: number;
    /**
     * In order to not get stuck in local optima, when this is non-zero, we try to
     * also work on "older" solutions with a worse objective value so we get a
     * chance to follow a different LS/LNS trajectory.
     *
     * @generated from field: optional int32 alternative_pool_size = 325 [default = 1];
     */
    alternativePoolSize: number;
    /**
     * Turns on relaxation induced neighborhood generator.
     *
     * @generated from field: optional bool use_rins_lns = 129 [default = true];
     */
    useRinsLns: boolean;
    /**
     * Adds a feasibility pump subsolver along with lns subsolvers.
     *
     * @generated from field: optional bool use_feasibility_pump = 164 [default = true];
     */
    useFeasibilityPump: boolean;
    /**
     * Turns on neighborhood generator based on local branching LP. Based on Huang
     * et al., "Local Branching Relaxation Heuristics for Integer Linear
     * Programs", 2023.
     *
     * @generated from field: optional bool use_lb_relax_lns = 255 [default = true];
     */
    useLbRelaxLns: boolean;
    /**
     * Only use lb-relax if we have at least that many workers.
     *
     * @generated from field: optional int32 lb_relax_num_workers_threshold = 296 [default = 16];
     */
    lbRelaxNumWorkersThreshold: number;
    /**
     * @generated from field: optional operations_research.sat.SatParameters.FPRoundingMethod fp_rounding = 165 [default = PROPAGATION_ASSISTED];
     */
    fpRounding: SatParameters_FPRoundingMethod;
    /**
     * If true, registers more lns subsolvers with different parameters.
     *
     * @generated from field: optional bool diversify_lns_params = 137 [default = false];
     */
    diversifyLnsParams: boolean;
    /**
     * Randomize fixed search.
     *
     * @generated from field: optional bool randomize_search = 103 [default = false];
     */
    randomizeSearch: boolean;
    /**
     * Search randomization will collect the top
     * 'search_random_variable_pool_size' valued variables, and pick one randomly.
     * The value of the variable is specific to each strategy.
     *
     * @generated from field: optional int64 search_random_variable_pool_size = 104 [default = 0];
     */
    searchRandomVariablePoolSize: bigint;
    /**
     * Experimental code: specify if the objective pushes all tasks toward the
     * start of the schedule.
     *
     * @generated from field: optional bool push_all_tasks_toward_start = 262 [default = false];
     */
    pushAllTasksTowardStart: boolean;
    /**
     * If true, we automatically detect variables whose constraint are always
     * enforced by the same literal and we mark them as optional. This allows
     * to propagate them as if they were present in some situation.
     *
     * TODO(user): This is experimental and seems to lead to wrong optimal in
     * some situation. It should however gives correct solutions. Fix.
     *
     * @generated from field: optional bool use_optional_variables = 108 [default = false];
     */
    useOptionalVariables: boolean;
    /**
     * The solver usually exploit the LP relaxation of a model. If this option is
     * true, then whatever is infered by the LP will be used like an heuristic to
     * compute EXACT propagation on the IP. So with this option, there is no
     * numerical imprecision issues.
     *
     * @generated from field: optional bool use_exact_lp_reason = 109 [default = true];
     */
    useExactLpReason: boolean;
    /**
     * This can be beneficial if there is a lot of no-overlap constraints but a
     * relatively low number of different intervals in the problem. Like 1000
     * intervals, but 1M intervals in the no-overlap constraints covering them.
     *
     * @generated from field: optional bool use_combined_no_overlap = 133 [default = false];
     */
    useCombinedNoOverlap: boolean;
    /**
     * All at_most_one constraints with a size <= param will be replaced by a
     * quadratic number of binary implications.
     *
     * @generated from field: optional int32 at_most_one_max_expansion_size = 270 [default = 3];
     */
    atMostOneMaxExpansionSize: number;
    /**
     * Indicates if the CP-SAT layer should catch Control-C (SIGINT) signals
     * when calling solve. If set, catching the SIGINT signal will terminate the
     * search gracefully, as if a time limit was reached.
     *
     * @generated from field: optional bool catch_sigint_signal = 135 [default = true];
     */
    catchSigintSignal: boolean;
    /**
     * Stores and exploits "implied-bounds" in the solver. That is, relations of
     * the form literal => (var >= bound). This is currently used to derive
     * stronger cuts.
     *
     * @generated from field: optional bool use_implied_bounds = 144 [default = true];
     */
    useImpliedBounds: boolean;
    /**
     * Whether we try to do a few degenerate iteration at the end of an LP solve
     * to minimize the fractionality of the integer variable in the basis. This
     * helps on some problems, but not so much on others. It also cost of bit of
     * time to do such polish step.
     *
     * @generated from field: optional bool polish_lp_solution = 175 [default = false];
     */
    polishLpSolution: boolean;
    /**
     * The internal LP tolerances used by CP-SAT. These applies to the internal
     * and scaled problem. If the domains of your variables are large it might be
     * good to use lower tolerances. If your problem is binary with low
     * coefficients, it might be good to use higher ones to speed-up the lp
     * solves.
     *
     * @generated from field: optional double lp_primal_tolerance = 266 [default = 1e-07];
     */
    lpPrimalTolerance: number;
    /**
     * @generated from field: optional double lp_dual_tolerance = 267 [default = 1e-07];
     */
    lpDualTolerance: number;
    /**
     * Temporary flag util the feature is more mature. This convert intervals to
     * the newer proto format that support affine start/var/end instead of just
     * variables.
     *
     * @generated from field: optional bool convert_intervals = 177 [default = true];
     */
    convertIntervals: boolean;
    /**
     * Whether we try to automatically detect the symmetries in a model and
     * exploit them. Currently, at level 1 we detect them in presolve and try
     * to fix Booleans. At level 2, we also do some form of dynamic symmetry
     * breaking during search. At level 3, we also detect symmetries for very
     * large models, which can be slow. At level 4, we try to break as much
     * symmetry as possible in presolve.
     *
     * @generated from field: optional int32 symmetry_level = 183 [default = 2];
     */
    symmetryLevel: number;
    /**
     * When we have symmetry, it is possible to "fold" all variables from the same
     * orbit into a single variable, while having the same power of LP relaxation.
     * This can help significantly on symmetric problem. However there is
     * currently a bit of overhead as the rest of the solver need to do some
     * translation between the folded LP and the rest of the problem.
     *
     * @generated from field: optional bool use_symmetry_in_lp = 301 [default = false];
     */
    useSymmetryInLp: boolean;
    /**
     * Experimental. This will compute the symmetry of the problem once and for
     * all. All presolve operations we do should keep the symmetry group intact
     * or modify it properly. For now we have really little support for this. We
     * will disable a bunch of presolve operations that could be supported.
     *
     * @generated from field: optional bool keep_symmetry_in_presolve = 303 [default = false];
     */
    keepSymmetryInPresolve: boolean;
    /**
     * Deterministic time limit for symmetry detection.
     *
     * @generated from field: optional double symmetry_detection_deterministic_time_limit = 302 [default = 1];
     */
    symmetryDetectionDeterministicTimeLimit: number;
    /**
     * The new linear propagation code treat all constraints at once and use
     * an adaptation of Bellman-Ford-Tarjan to propagate constraint in a smarter
     * order and potentially detect propagation cycle earlier.
     *
     * @generated from field: optional bool new_linear_propagation = 224 [default = true];
     */
    newLinearPropagation: boolean;
    /**
     * Linear constraints that are not pseudo-Boolean and that are longer than
     * this size will be split into sqrt(size) intermediate sums in order to have
     * faster propation in the CP engine.
     *
     * @generated from field: optional int32 linear_split_size = 256 [default = 100];
     */
    linearSplitSize: number;
    /**
     * A non-negative level indicating the type of constraints we consider in the
     * LP relaxation. At level zero, no LP relaxation is used. At level 1, only
     * the linear constraint and full encoding are added. At level 2, we also add
     * all the Boolean constraints.
     *
     * @generated from field: optional int32 linearization_level = 90 [default = 1];
     */
    linearizationLevel: number;
    /**
     * A non-negative level indicating how much we should try to fully encode
     * Integer variables as Boolean.
     *
     * @generated from field: optional int32 boolean_encoding_level = 107 [default = 1];
     */
    booleanEncodingLevel: number;
    /**
     * When loading a*x + b*y ==/!= c when x and y are both fully encoded.
     * The solver may decide to replace the linear equation by a set of clauses.
     * This is triggered if the sizes of the domains of x and y are below the
     * threshold.
     *
     * @generated from field: optional int32 max_domain_size_when_encoding_eq_neq_constraints = 191 [default = 16];
     */
    maxDomainSizeWhenEncodingEqNeqConstraints: number;
    /**
     * The limit on the number of cuts in our cut pool. When this is reached we do
     * not generate cuts anymore.
     *
     * TODO(user): We should probably remove this parameters, and just always
     * generate cuts but only keep the best n or something.
     *
     * @generated from field: optional int32 max_num_cuts = 91 [default = 10000];
     */
    maxNumCuts: number;
    /**
     * Control the global cut effort. Zero will turn off all cut. For now we just
     * have one level. Note also that most cuts are only used at linearization
     * level >= 2.
     *
     * @generated from field: optional int32 cut_level = 196 [default = 1];
     */
    cutLevel: number;
    /**
     * For the cut that can be generated at any level, this control if we only
     * try to generate them at the root node.
     *
     * @generated from field: optional bool only_add_cuts_at_level_zero = 92 [default = false];
     */
    onlyAddCutsAtLevelZero: boolean;
    /**
     * When the LP objective is fractional, do we add the cut that forces the
     * linear objective expression to be greater or equal to this fractional value
     * rounded up? We can always do that since our objective is integer, and
     * combined with MIR heuristic to reduce the coefficient of such cut, it can
     * help.
     *
     * @generated from field: optional bool add_objective_cut = 197 [default = false];
     */
    addObjectiveCut: boolean;
    /**
     * Whether we generate and add Chvatal-Gomory cuts to the LP at root node.
     * Note that for now, this is not heavily tuned.
     *
     * @generated from field: optional bool add_cg_cuts = 117 [default = true];
     */
    addCgCuts: boolean;
    /**
     * Whether we generate MIR cuts at root node.
     * Note that for now, this is not heavily tuned.
     *
     * @generated from field: optional bool add_mir_cuts = 120 [default = true];
     */
    addMirCuts: boolean;
    /**
     * Whether we generate Zero-Half cuts at root node.
     * Note that for now, this is not heavily tuned.
     *
     * @generated from field: optional bool add_zero_half_cuts = 169 [default = true];
     */
    addZeroHalfCuts: boolean;
    /**
     * Whether we generate clique cuts from the binary implication graph. Note
     * that as the search goes on, this graph will contains new binary clauses
     * learned by the SAT engine.
     *
     * @generated from field: optional bool add_clique_cuts = 172 [default = true];
     */
    addCliqueCuts: boolean;
    /**
     * Whether we generate RLT cuts. This is still experimental but can help on
     * binary problem with a lot of clauses of size 3.
     *
     * @generated from field: optional bool add_rlt_cuts = 279 [default = true];
     */
    addRltCuts: boolean;
    /**
     * Cut generator for all diffs can add too many cuts for large all_diff
     * constraints. This parameter restricts the large all_diff constraints to
     * have a cut generator.
     *
     * @generated from field: optional int32 max_all_diff_cut_size = 148 [default = 64];
     */
    maxAllDiffCutSize: number;
    /**
     * For the lin max constraints, generates the cuts described in "Strong
     * mixed-integer programming formulations for trained neural networks" by Ross
     * Anderson et. (https://arxiv.org/pdf/1811.01988.pdf)
     *
     * @generated from field: optional bool add_lin_max_cuts = 152 [default = true];
     */
    addLinMaxCuts: boolean;
    /**
     * In the integer rounding procedure used for MIR and Gomory cut, the maximum
     * "scaling" we use (must be positive). The lower this is, the lower the
     * integer coefficients of the cut will be. Note that cut generated by lower
     * values are not necessarily worse than cut generated by larger value. There
     * is no strict dominance relationship.
     *
     * Setting this to 2 result in the "strong fractional rouding" of Letchford
     * and Lodi.
     *
     * @generated from field: optional int32 max_integer_rounding_scaling = 119 [default = 600];
     */
    maxIntegerRoundingScaling: number;
    /**
     * If true, we start by an empty LP, and only add constraints not satisfied
     * by the current LP solution batch by batch. A constraint that is only added
     * like this is known as a "lazy" constraint in the literature, except that we
     * currently consider all constraints as lazy here.
     *
     * @generated from field: optional bool add_lp_constraints_lazily = 112 [default = true];
     */
    addLpConstraintsLazily: boolean;
    /**
     * Even at the root node, we do not want to spend too much time on the LP if
     * it is "difficult". So we solve it in "chunks" of that many iterations. The
     * solve will be continued down in the tree or the next time we go back to the
     * root node.
     *
     * @generated from field: optional int32 root_lp_iterations = 227 [default = 2000];
     */
    rootLpIterations: number;
    /**
     * While adding constraints, skip the constraints which have orthogonality
     * less than 'min_orthogonality_for_lp_constraints' with already added
     * constraints during current call. Orthogonality is defined as 1 -
     * cosine(vector angle between constraints). A value of zero disable this
     * feature.
     *
     * @generated from field: optional double min_orthogonality_for_lp_constraints = 115 [default = 0.05];
     */
    minOrthogonalityForLpConstraints: number;
    /**
     * Max number of time we perform cut generation and resolve the LP at level 0.
     *
     * @generated from field: optional int32 max_cut_rounds_at_level_zero = 154 [default = 1];
     */
    maxCutRoundsAtLevelZero: number;
    /**
     * If a constraint/cut in LP is not active for that many consecutive OPTIMAL
     * solves, remove it from the LP. Note that it might be added again later if
     * it become violated by the current LP solution.
     *
     * @generated from field: optional int32 max_consecutive_inactive_count = 121 [default = 100];
     */
    maxConsecutiveInactiveCount: number;
    /**
     * These parameters are similar to sat clause management activity parameters.
     * They are effective only if the number of generated cuts exceed the storage
     * limit. Default values are based on a few experiments on miplib instances.
     *
     * @generated from field: optional double cut_max_active_count_value = 155 [default = 1e+10];
     */
    cutMaxActiveCountValue: number;
    /**
     * @generated from field: optional double cut_active_count_decay = 156 [default = 0.8];
     */
    cutActiveCountDecay: number;
    /**
     * Target number of constraints to remove during cleanup.
     *
     * @generated from field: optional int32 cut_cleanup_target = 157 [default = 1000];
     */
    cutCleanupTarget: number;
    /**
     * Add that many lazy constraints (or cuts) at once in the LP. Note that at
     * the beginning of the solve, we do add more than this.
     *
     * @generated from field: optional int32 new_constraints_batch_size = 122 [default = 50];
     */
    newConstraintsBatchSize: number;
    /**
     * If true and the Lp relaxation of the problem has an integer optimal
     * solution, try to exploit it. Note that since the LP relaxation may not
     * contain all the constraints, such a solution is not necessarily a solution
     * of the full problem.
     *
     * @generated from field: optional bool exploit_integer_lp_solution = 94 [default = true];
     */
    exploitIntegerLpSolution: boolean;
    /**
     * If true and the Lp relaxation of the problem has a solution, try to exploit
     * it. This is same as above except in this case the lp solution might not be
     * an integer solution.
     *
     * @generated from field: optional bool exploit_all_lp_solution = 116 [default = true];
     */
    exploitAllLpSolution: boolean;
    /**
     * When branching on a variable, follow the last best solution value.
     *
     * @generated from field: optional bool exploit_best_solution = 130 [default = false];
     */
    exploitBestSolution: boolean;
    /**
     * When branching on a variable, follow the last best relaxation solution
     * value. We use the relaxation with the tightest bound on the objective as
     * the best relaxation solution.
     *
     * @generated from field: optional bool exploit_relaxation_solution = 161 [default = false];
     */
    exploitRelaxationSolution: boolean;
    /**
     * When branching an a variable that directly affect the objective,
     * branch on the value that lead to the best objective first.
     *
     * @generated from field: optional bool exploit_objective = 131 [default = true];
     */
    exploitObjective: boolean;
    /**
     * Infer products of Boolean or of Boolean time IntegerVariable from the
     * linear constrainst in the problem. This can be used in some cuts, altough
     * for now we don't really exploit it.
     *
     * @generated from field: optional bool detect_linearized_product = 277 [default = false];
     */
    detectLinearizedProduct: boolean;
    /**
     * This should be better on integer problems.
     * But it is still work in progress.
     *
     * @generated from field: optional bool use_new_integer_conflict_resolution = 336 [default = false];
     */
    useNewIntegerConflictResolution: boolean;
    /**
     * If true, and during integer conflict resolution (icr) the 1-UIP is an
     * integer literal for which we do not have an associated Boolean. Create one.
     *
     * @generated from field: optional bool create_1uip_boolean_during_icr = 341 [default = true];
     */
    create1uipBooleanDuringIcr: boolean;
    /**
     * We need to bound the maximum magnitude of the variables for CP-SAT, and
     * that is the bound we use. If the MIP model expect larger variable value in
     * the solution, then the converted model will likely not be relevant.
     *
     * @generated from field: optional double mip_max_bound = 124 [default = 1e+07];
     */
    mipMaxBound: number;
    /**
     * All continuous variable of the problem will be multiplied by this factor.
     * By default, we don't do any variable scaling and rely on the MIP model to
     * specify continuous variable domain with the wanted precision.
     *
     * @generated from field: optional double mip_var_scaling = 125 [default = 1];
     */
    mipVarScaling: number;
    /**
     * If this is false, then mip_var_scaling is only applied to variables with
     * "small" domain. If it is true, we scale all floating point variable
     * independenlty of their domain.
     *
     * @generated from field: optional bool mip_scale_large_domain = 225 [default = false];
     */
    mipScaleLargeDomain: boolean;
    /**
     * If true, some continuous variable might be automatically scaled. For now,
     * this is only the case where we detect that a variable is actually an
     * integer multiple of a constant. For instance, variables of the form k * 0.5
     * are quite frequent, and if we detect this, we will scale such variable
     * domain by 2 to make it implied integer.
     *
     * @generated from field: optional bool mip_automatically_scale_variables = 166 [default = true];
     */
    mipAutomaticallyScaleVariables: boolean;
    /**
     * If one try to solve a MIP model with CP-SAT, because we assume all variable
     * to be integer after scaling, we will not necessarily have the correct
     * optimal. Note however that all feasible solutions are valid since we will
     * just solve a more restricted version of the original problem.
     *
     * This parameters is here to prevent user to think the solution is optimal
     * when it might not be. One will need to manually set this to false to solve
     * a MIP model where the optimal might be different.
     *
     * Note that this is tested after some MIP presolve steps, so even if not
     * all original variable are integer, we might end up with a pure IP after
     * presolve and after implied integer detection.
     *
     * @generated from field: optional bool only_solve_ip = 222 [default = false];
     */
    onlySolveIp: boolean;
    /**
     * When scaling constraint with double coefficients to integer coefficients,
     * we will multiply by a power of 2 and round the coefficients. We will choose
     * the lowest power such that we have no potential overflow (see
     * mip_max_activity_exponent) and the worst case constraint activity error
     * does not exceed this threshold.
     *
     * Note that we also detect constraint with rational coefficients and scale
     * them accordingly when it seems better instead of using a power of 2.
     *
     * We also relax all constraint bounds by this absolute value. For pure
     * integer constraint, if this value if lower than one, this will not change
     * anything. However it is needed when scaling MIP problems.
     *
     * If we manage to scale a constraint correctly, the maximum error we can make
     * will be twice this value (once for the scaling error and once for the
     * relaxed bounds). If we are not able to scale that well, we will display
     * that fact but still scale as best as we can.
     *
     * @generated from field: optional double mip_wanted_precision = 126 [default = 1e-06];
     */
    mipWantedPrecision: number;
    /**
     * To avoid integer overflow, we always force the maximum possible constraint
     * activity (and objective value) according to the initial variable domain to
     * be smaller than 2 to this given power. Because of this, we cannot always
     * reach the "mip_wanted_precision" parameter above.
     *
     * This can go as high as 62, but some internal algo currently abort early if
     * they might run into integer overflow, so it is better to keep it a bit
     * lower than this.
     *
     * @generated from field: optional int32 mip_max_activity_exponent = 127 [default = 53];
     */
    mipMaxActivityExponent: number;
    /**
     * As explained in mip_precision and mip_max_activity_exponent, we cannot
     * always reach the wanted precision during scaling. We use this threshold to
     * enphasize in the logs when the precision seems bad.
     *
     * @generated from field: optional double mip_check_precision = 128 [default = 0.0001];
     */
    mipCheckPrecision: number;
    /**
     * Even if we make big error when scaling the objective, we can always derive
     * a correct lower bound on the original objective by using the exact lower
     * bound on the scaled integer version of the objective. This should be fast,
     * but if you don't care about having a precise lower bound, you can turn it
     * off.
     *
     * @generated from field: optional bool mip_compute_true_objective_bound = 198 [default = true];
     */
    mipComputeTrueObjectiveBound: boolean;
    /**
     * Any finite values in the input MIP must be below this threshold, otherwise
     * the model will be reported invalid. This is needed to avoid floating point
     * overflow when evaluating bounds * coeff for instance. We are a bit more
     * defensive, but in practice, users shouldn't use super large values in a
     * MIP.
     *
     * @generated from field: optional double mip_max_valid_magnitude = 199 [default = 1e+20];
     */
    mipMaxValidMagnitude: number;
    /**
     * By default, any variable/constraint bound with a finite value and a
     * magnitude greater than the mip_max_valid_magnitude will result with a
     * invalid model. This flags change the behavior such that such bounds are
     * silently transformed to +∞ or -∞.
     *
     * It is recommended to keep it at false, and create valid bounds.
     *
     * @generated from field: optional bool mip_treat_high_magnitude_bounds_as_infinity = 278 [default = false];
     */
    mipTreatHighMagnitudeBoundsAsInfinity: boolean;
    /**
     * Any value in the input mip with a magnitude lower than this will be set to
     * zero. This is to avoid some issue in LP presolving.
     *
     * @generated from field: optional double mip_drop_tolerance = 232 [default = 1e-16];
     */
    mipDropTolerance: number;
    /**
     * When solving a MIP, we do some basic floating point presolving before
     * scaling the problem to integer to be handled by CP-SAT. This control how
     * much of that presolve we do. It can help to better scale floating point
     * model, but it is not always behaving nicely.
     *
     * @generated from field: optional int32 mip_presolve_level = 261 [default = 2];
     */
    mipPresolveLevel: number;
};
/**
 * Describes the message operations_research.sat.SatParameters.
 * Use `create(SatParametersSchema)` to create a new message.
 */
export declare const SatParametersSchema: GenMessage<SatParameters>;
/**
 * Variables without activity (i.e. at the beginning of the search) will be
 * tried in this preferred order.
 *
 * @generated from enum operations_research.sat.SatParameters.VariableOrder
 */
export declare enum SatParameters_VariableOrder {
    /**
     * As specified by the problem.
     *
     * @generated from enum value: IN_ORDER = 0;
     */
    IN_ORDER = 0,
    /**
     * @generated from enum value: IN_REVERSE_ORDER = 1;
     */
    IN_REVERSE_ORDER = 1,
    /**
     * @generated from enum value: IN_RANDOM_ORDER = 2;
     */
    IN_RANDOM_ORDER = 2
}
/**
 * Describes the enum operations_research.sat.SatParameters.VariableOrder.
 */
export declare const SatParameters_VariableOrderSchema: GenEnum<SatParameters_VariableOrder>;
/**
 * Specifies the initial polarity (true/false) when the solver branches on a
 * variable. This can be modified later by the user, or the phase saving
 * heuristic.
 *
 * Note(user): POLARITY_FALSE is usually a good choice because of the
 * "natural" way to express a linear boolean problem.
 *
 * @generated from enum operations_research.sat.SatParameters.Polarity
 */
export declare enum SatParameters_Polarity {
    /**
     * @generated from enum value: POLARITY_TRUE = 0;
     */
    TRUE = 0,
    /**
     * @generated from enum value: POLARITY_FALSE = 1;
     */
    FALSE = 1,
    /**
     * @generated from enum value: POLARITY_RANDOM = 2;
     */
    RANDOM = 2
}
/**
 * Describes the enum operations_research.sat.SatParameters.Polarity.
 */
export declare const SatParameters_PolaritySchema: GenEnum<SatParameters_Polarity>;
/**
 * Do we try to minimize conflicts (greedily) when creating them.
 *
 * @generated from enum operations_research.sat.SatParameters.ConflictMinimizationAlgorithm
 */
export declare enum SatParameters_ConflictMinimizationAlgorithm {
    /**
     * @generated from enum value: NONE = 0;
     */
    NONE = 0,
    /**
     * @generated from enum value: SIMPLE = 1;
     */
    SIMPLE = 1,
    /**
     * @generated from enum value: RECURSIVE = 2;
     */
    RECURSIVE = 2
}
/**
 * Describes the enum operations_research.sat.SatParameters.ConflictMinimizationAlgorithm.
 */
export declare const SatParameters_ConflictMinimizationAlgorithmSchema: GenEnum<SatParameters_ConflictMinimizationAlgorithm>;
/**
 * Whether to expoit the binary clause to minimize learned clauses further.
 *
 * @generated from enum operations_research.sat.SatParameters.BinaryMinizationAlgorithm
 */
export declare enum SatParameters_BinaryMinizationAlgorithm {
    /**
     * @generated from enum value: NO_BINARY_MINIMIZATION = 0;
     */
    NO_BINARY_MINIMIZATION = 0,
    /**
     * @generated from enum value: BINARY_MINIMIZATION_FROM_UIP = 1;
     */
    BINARY_MINIMIZATION_FROM_UIP = 1,
    /**
     * @generated from enum value: BINARY_MINIMIZATION_FROM_UIP_AND_DECISIONS = 5;
     */
    BINARY_MINIMIZATION_FROM_UIP_AND_DECISIONS = 5
}
/**
 * Describes the enum operations_research.sat.SatParameters.BinaryMinizationAlgorithm.
 */
export declare const SatParameters_BinaryMinizationAlgorithmSchema: GenEnum<SatParameters_BinaryMinizationAlgorithm>;
/**
 * The clauses that will be kept during a cleanup are the ones that come
 * first under this order. We always keep or exclude ties together.
 *
 * @generated from enum operations_research.sat.SatParameters.ClauseOrdering
 */
export declare enum SatParameters_ClauseOrdering {
    /**
     * Order clause by decreasing activity, then by increasing LBD.
     *
     * @generated from enum value: CLAUSE_ACTIVITY = 0;
     */
    CLAUSE_ACTIVITY = 0,
    /**
     * Order clause by increasing LBD, then by decreasing activity.
     *
     * @generated from enum value: CLAUSE_LBD = 1;
     */
    CLAUSE_LBD = 1
}
/**
 * Describes the enum operations_research.sat.SatParameters.ClauseOrdering.
 */
export declare const SatParameters_ClauseOrderingSchema: GenEnum<SatParameters_ClauseOrdering>;
/**
 * Restart algorithms.
 *
 * A reference for the more advanced ones is:
 * Gilles Audemard, Laurent Simon, "Refining Restarts Strategies for SAT
 * and UNSAT", Principles and Practice of Constraint Programming Lecture
 * Notes in Computer Science 2012, pp 118-126
 *
 * @generated from enum operations_research.sat.SatParameters.RestartAlgorithm
 */
export declare enum SatParameters_RestartAlgorithm {
    /**
     * @generated from enum value: NO_RESTART = 0;
     */
    NO_RESTART = 0,
    /**
     * Just follow a Luby sequence times restart_period.
     *
     * @generated from enum value: LUBY_RESTART = 1;
     */
    LUBY_RESTART = 1,
    /**
     * Moving average restart based on the decision level of conflicts.
     *
     * @generated from enum value: DL_MOVING_AVERAGE_RESTART = 2;
     */
    DL_MOVING_AVERAGE_RESTART = 2,
    /**
     * Moving average restart based on the LBD of conflicts.
     *
     * @generated from enum value: LBD_MOVING_AVERAGE_RESTART = 3;
     */
    LBD_MOVING_AVERAGE_RESTART = 3,
    /**
     * Fixed period restart every restart period.
     *
     * @generated from enum value: FIXED_RESTART = 4;
     */
    FIXED_RESTART = 4
}
/**
 * Describes the enum operations_research.sat.SatParameters.RestartAlgorithm.
 */
export declare const SatParameters_RestartAlgorithmSchema: GenEnum<SatParameters_RestartAlgorithm>;
/**
 * In what order do we add the assumptions in a core-based max-sat algorithm
 *
 * @generated from enum operations_research.sat.SatParameters.MaxSatAssumptionOrder
 */
export declare enum SatParameters_MaxSatAssumptionOrder {
    /**
     * @generated from enum value: DEFAULT_ASSUMPTION_ORDER = 0;
     */
    DEFAULT_ASSUMPTION_ORDER = 0,
    /**
     * @generated from enum value: ORDER_ASSUMPTION_BY_DEPTH = 1;
     */
    ORDER_ASSUMPTION_BY_DEPTH = 1,
    /**
     * @generated from enum value: ORDER_ASSUMPTION_BY_WEIGHT = 2;
     */
    ORDER_ASSUMPTION_BY_WEIGHT = 2
}
/**
 * Describes the enum operations_research.sat.SatParameters.MaxSatAssumptionOrder.
 */
export declare const SatParameters_MaxSatAssumptionOrderSchema: GenEnum<SatParameters_MaxSatAssumptionOrder>;
/**
 * What stratification algorithm we use in the presence of weight.
 *
 * @generated from enum operations_research.sat.SatParameters.MaxSatStratificationAlgorithm
 */
export declare enum SatParameters_MaxSatStratificationAlgorithm {
    /**
     * No stratification of the problem.
     *
     * @generated from enum value: STRATIFICATION_NONE = 0;
     */
    STRATIFICATION_NONE = 0,
    /**
     * Start with literals with the highest weight, and when SAT, add the
     * literals with the next highest weight and so on.
     *
     * @generated from enum value: STRATIFICATION_DESCENT = 1;
     */
    STRATIFICATION_DESCENT = 1,
    /**
     * Start with all literals. Each time a core is found with a given minimum
     * weight, do not consider literals with a lower weight for the next core
     * computation. If the subproblem is SAT, do like in STRATIFICATION_DESCENT
     * and just add the literals with the next highest weight.
     *
     * @generated from enum value: STRATIFICATION_ASCENT = 2;
     */
    STRATIFICATION_ASCENT = 2
}
/**
 * Describes the enum operations_research.sat.SatParameters.MaxSatStratificationAlgorithm.
 */
export declare const SatParameters_MaxSatStratificationAlgorithmSchema: GenEnum<SatParameters_MaxSatStratificationAlgorithm>;
/**
 * The search branching will be used to decide how to branch on unfixed nodes.
 *
 * @generated from enum operations_research.sat.SatParameters.SearchBranching
 */
export declare enum SatParameters_SearchBranching {
    /**
     * Try to fix all literals using the underlying SAT solver's heuristics,
     * then generate and fix literals until integer variables are fixed. New
     * literals on integer variables are generated using the fixed search
     * specified by the user or our default one.
     *
     * @generated from enum value: AUTOMATIC_SEARCH = 0;
     */
    AUTOMATIC_SEARCH = 0,
    /**
     * If used then all decisions taken by the solver are made using a fixed
     * order as specified in the API or in the CpModelProto search_strategy
     * field.
     *
     * @generated from enum value: FIXED_SEARCH = 1;
     */
    FIXED_SEARCH = 1,
    /**
     * Simple portfolio search used by LNS workers.
     *
     * @generated from enum value: PORTFOLIO_SEARCH = 2;
     */
    PORTFOLIO_SEARCH = 2,
    /**
     * If used, the solver will use heuristics from the LP relaxation. This
     * exploit the reduced costs of the variables in the relaxation.
     *
     * @generated from enum value: LP_SEARCH = 3;
     */
    LP_SEARCH = 3,
    /**
     * If used, the solver uses the pseudo costs for branching. Pseudo costs
     * are computed using the historical change in objective bounds when some
     * decision are taken. Note that this works whether we use an LP or not.
     *
     * @generated from enum value: PSEUDO_COST_SEARCH = 4;
     */
    PSEUDO_COST_SEARCH = 4,
    /**
     * Mainly exposed here for testing. This quickly tries a lot of randomized
     * heuristics with a low conflict limit. It usually provides a good first
     * solution.
     *
     * @generated from enum value: PORTFOLIO_WITH_QUICK_RESTART_SEARCH = 5;
     */
    PORTFOLIO_WITH_QUICK_RESTART_SEARCH = 5,
    /**
     * Mainly used internally. This is like FIXED_SEARCH, except we follow the
     * solution_hint field of the CpModelProto rather than using the information
     * provided in the search_strategy.
     *
     * @generated from enum value: HINT_SEARCH = 6;
     */
    HINT_SEARCH = 6,
    /**
     * Similar to FIXED_SEARCH, but differ in how the variable not listed into
     * the fixed search heuristics are branched on. This will always start the
     * search tree according to the specified fixed search strategy, but will
     * complete it using the default automatic search.
     *
     * @generated from enum value: PARTIAL_FIXED_SEARCH = 7;
     */
    PARTIAL_FIXED_SEARCH = 7,
    /**
     * Randomized search. Used to increase entropy in the search.
     *
     * @generated from enum value: RANDOMIZED_SEARCH = 8;
     */
    RANDOMIZED_SEARCH = 8
}
/**
 * Describes the enum operations_research.sat.SatParameters.SearchBranching.
 */
export declare const SatParameters_SearchBranchingSchema: GenEnum<SatParameters_SearchBranching>;
/**
 * @generated from enum operations_research.sat.SatParameters.SharedTreeSplitStrategy
 */
export declare enum SatParameters_SharedTreeSplitStrategy {
    /**
     * Uses the default strategy, currently equivalent to
     * SPLIT_STRATEGY_DISCREPANCY.
     *
     * @generated from enum value: SPLIT_STRATEGY_AUTO = 0;
     */
    SPLIT_STRATEGY_AUTO = 0,
    /**
     * Only accept splits if the node to be split's depth+discrepancy is minimal
     * for the desired number of leaves.
     * The preferred child for discrepancy calculation is the one with the
     * lowest objective lower bound or the original branch direction if the
     * bounds are equal. This rule allows twice as many workers to work in the
     * preferred subtree as non-preferred.
     *
     * @generated from enum value: SPLIT_STRATEGY_DISCREPANCY = 1;
     */
    SPLIT_STRATEGY_DISCREPANCY = 1,
    /**
     * Only split nodes with an objective lb equal to the global lb. If there is
     * no objective, this is equivalent to SPLIT_STRATEGY_FIRST_PROPOSAL.
     *
     * @generated from enum value: SPLIT_STRATEGY_OBJECTIVE_LB = 2;
     */
    SPLIT_STRATEGY_OBJECTIVE_LB = 2,
    /**
     * Attempt to keep the shared tree balanced.
     *
     * @generated from enum value: SPLIT_STRATEGY_BALANCED_TREE = 3;
     */
    SPLIT_STRATEGY_BALANCED_TREE = 3,
    /**
     * Workers race to split their subtree, the winner's proposal is accepted.
     *
     * @generated from enum value: SPLIT_STRATEGY_FIRST_PROPOSAL = 4;
     */
    SPLIT_STRATEGY_FIRST_PROPOSAL = 4
}
/**
 * Describes the enum operations_research.sat.SatParameters.SharedTreeSplitStrategy.
 */
export declare const SatParameters_SharedTreeSplitStrategySchema: GenEnum<SatParameters_SharedTreeSplitStrategy>;
/**
 * Rounding method to use for feasibility pump.
 *
 * @generated from enum operations_research.sat.SatParameters.FPRoundingMethod
 */
export declare enum SatParameters_FPRoundingMethod {
    /**
     * Rounds to the nearest integer value.
     *
     * @generated from enum value: NEAREST_INTEGER = 0;
     */
    NEAREST_INTEGER = 0,
    /**
     * Counts the number of linear constraints restricting the variable in the
     * increasing values (up locks) and decreasing values (down locks). Rounds
     * the variable in the direction of lesser locks.
     *
     * @generated from enum value: LOCK_BASED = 1;
     */
    LOCK_BASED = 1,
    /**
     * Similar to lock based rounding except this only considers locks of active
     * constraints from the last lp solve.
     *
     * @generated from enum value: ACTIVE_LOCK_BASED = 3;
     */
    ACTIVE_LOCK_BASED = 3,
    /**
     * This is expensive rounding algorithm. We round variables one by one and
     * propagate the bounds in between. If none of the rounded values fall in
     * the continuous domain specified by lower and upper bound, we use the
     * current lower/upper bound (whichever one is closest) instead of rounding
     * the fractional lp solution value. If both the rounded values are in the
     * domain, we round to nearest integer.
     *
     * @generated from enum value: PROPAGATION_ASSISTED = 2;
     */
    PROPAGATION_ASSISTED = 2
}
/**
 * Describes the enum operations_research.sat.SatParameters.FPRoundingMethod.
 */
export declare const SatParameters_FPRoundingMethodSchema: GenEnum<SatParameters_FPRoundingMethod>;
//# sourceMappingURL=sat_parameters_pb.d.ts.map