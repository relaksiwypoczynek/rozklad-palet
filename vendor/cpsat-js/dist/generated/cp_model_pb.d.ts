import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file cp_model.proto.
 */
export declare const file_cp_model: GenFile;
/**
 * An integer variable.
 *
 * It will be referred to by an int32 corresponding to its index in a
 * CpModelProto variables field.
 *
 * Depending on the context, a reference to a variable whose domain is in [0, 1]
 * can also be seen as a Boolean that will be true if the variable value is 1
 * and false if it is 0. When used in this context, the field name will always
 * contain the word "literal".
 *
 * Negative reference (advanced usage): to simplify the creation of a model and
 * for efficiency reasons, all the "literal" or "variable" fields can also
 * contain a negative index. A negative index i will refer to the negation of
 * the integer variable at index -i -1 or to NOT the literal at the same index.
 *
 * Ex: A variable index 4 will refer to the integer variable model.variables(4)
 * and an index of -5 will refer to the negation of the same variable. A literal
 * index 4 will refer to the logical fact that model.variable(4) == 1 and a
 * literal index of -5 will refer to the logical fact model.variable(4) == 0.
 *
 * @generated from message operations_research.sat.IntegerVariableProto
 */
export type IntegerVariableProto = Message<"operations_research.sat.IntegerVariableProto"> & {
    /**
     * For debug/logging only. Can be empty.
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * The variable domain given as a sorted list of n disjoint intervals
     * [min, max] and encoded as [min_0, max_0,  ..., min_{n-1}, max_{n-1}].
     *
     * The most common example being just [min, max].
     * If min == max, then this is a constant variable.
     *
     * We have:
     *  - domain_size() is always even.
     *  - min == domain.front();
     *  - max == domain.back();
     *  - for all i < n   :      min_i <= max_i
     *  - for all i < n-1 :  max_i + 1 < min_{i+1}.
     *
     * Note that we check at validation that a variable domain is small enough so
     * that we don't run into integer overflow in our algorithms. Because of that,
     * you cannot just have "unbounded" variable like [0, kint64max] and should
     * try to specify tighter domains.
     *
     * @generated from field: repeated int64 domain = 2;
     */
    domain: bigint[];
};
/**
 * Describes the message operations_research.sat.IntegerVariableProto.
 * Use `create(IntegerVariableProtoSchema)` to create a new message.
 */
export declare const IntegerVariableProtoSchema: GenMessage<IntegerVariableProto>;
/**
 * Argument of the constraints of the form OP(literals).
 *
 * @generated from message operations_research.sat.BoolArgumentProto
 */
export type BoolArgumentProto = Message<"operations_research.sat.BoolArgumentProto"> & {
    /**
     * @generated from field: repeated int32 literals = 1;
     */
    literals: number[];
};
/**
 * Describes the message operations_research.sat.BoolArgumentProto.
 * Use `create(BoolArgumentProtoSchema)` to create a new message.
 */
export declare const BoolArgumentProtoSchema: GenMessage<BoolArgumentProto>;
/**
 * Some constraints supports linear expression instead of just using a reference
 * to a variable. This is especially useful during presolve to reduce the model
 * size.
 *
 * @generated from message operations_research.sat.LinearExpressionProto
 */
export type LinearExpressionProto = Message<"operations_research.sat.LinearExpressionProto"> & {
    /**
     * @generated from field: repeated int32 vars = 1;
     */
    vars: number[];
    /**
     * @generated from field: repeated int64 coeffs = 2;
     */
    coeffs: bigint[];
    /**
     * @generated from field: int64 offset = 3;
     */
    offset: bigint;
};
/**
 * Describes the message operations_research.sat.LinearExpressionProto.
 * Use `create(LinearExpressionProtoSchema)` to create a new message.
 */
export declare const LinearExpressionProtoSchema: GenMessage<LinearExpressionProto>;
/**
 * @generated from message operations_research.sat.LinearArgumentProto
 */
export type LinearArgumentProto = Message<"operations_research.sat.LinearArgumentProto"> & {
    /**
     * @generated from field: operations_research.sat.LinearExpressionProto target = 1;
     */
    target?: LinearExpressionProto;
    /**
     * @generated from field: repeated operations_research.sat.LinearExpressionProto exprs = 2;
     */
    exprs: LinearExpressionProto[];
};
/**
 * Describes the message operations_research.sat.LinearArgumentProto.
 * Use `create(LinearArgumentProtoSchema)` to create a new message.
 */
export declare const LinearArgumentProtoSchema: GenMessage<LinearArgumentProto>;
/**
 * All expressions must take different values.
 *
 * @generated from message operations_research.sat.AllDifferentConstraintProto
 */
export type AllDifferentConstraintProto = Message<"operations_research.sat.AllDifferentConstraintProto"> & {
    /**
     * @generated from field: repeated operations_research.sat.LinearExpressionProto exprs = 1;
     */
    exprs: LinearExpressionProto[];
};
/**
 * Describes the message operations_research.sat.AllDifferentConstraintProto.
 * Use `create(AllDifferentConstraintProtoSchema)` to create a new message.
 */
export declare const AllDifferentConstraintProtoSchema: GenMessage<AllDifferentConstraintProto>;
/**
 * The linear sum vars[i] * coeffs[i] must fall in the given domain. The domain
 * has the same format as the one in IntegerVariableProto.
 *
 * Note that the validation code currently checks using the domain of the
 * involved variables that the sum can always be computed without integer
 * overflow and throws an error otherwise.
 *
 * @generated from message operations_research.sat.LinearConstraintProto
 */
export type LinearConstraintProto = Message<"operations_research.sat.LinearConstraintProto"> & {
    /**
     * @generated from field: repeated int32 vars = 1;
     */
    vars: number[];
    /**
     * Same size as vars.
     *
     * @generated from field: repeated int64 coeffs = 2;
     */
    coeffs: bigint[];
    /**
     * @generated from field: repeated int64 domain = 3;
     */
    domain: bigint[];
};
/**
 * Describes the message operations_research.sat.LinearConstraintProto.
 * Use `create(LinearConstraintProtoSchema)` to create a new message.
 */
export declare const LinearConstraintProtoSchema: GenMessage<LinearConstraintProto>;
/**
 * The constraint linear_target = exprs[linear_index].
 * This enforces that index takes one of the value in [0, vars_size()).
 *
 * @generated from message operations_research.sat.ElementConstraintProto
 */
export type ElementConstraintProto = Message<"operations_research.sat.ElementConstraintProto"> & {
    /**
     * Legacy field.
     *
     * @generated from field: int32 index = 1;
     */
    index: number;
    /**
     * Legacy field.
     *
     * @generated from field: int32 target = 2;
     */
    target: number;
    /**
     * Legacy field.
     *
     * @generated from field: repeated int32 vars = 3;
     */
    vars: number[];
    /**
     * @generated from field: operations_research.sat.LinearExpressionProto linear_index = 4;
     */
    linearIndex?: LinearExpressionProto;
    /**
     * @generated from field: operations_research.sat.LinearExpressionProto linear_target = 5;
     */
    linearTarget?: LinearExpressionProto;
    /**
     * @generated from field: repeated operations_research.sat.LinearExpressionProto exprs = 6;
     */
    exprs: LinearExpressionProto[];
};
/**
 * Describes the message operations_research.sat.ElementConstraintProto.
 * Use `create(ElementConstraintProtoSchema)` to create a new message.
 */
export declare const ElementConstraintProtoSchema: GenMessage<ElementConstraintProto>;
/**
 * This is not really a constraint. It is there so it can be referred by other
 * constraints using this "interval" concept.
 *
 * IMPORTANT: For now, this constraint do not enforce any relations on the
 * components, and it is up to the client to add in the model:
 * - enforcement => start + size == end.
 * - enforcement => size >= 0  // Only needed if size is not already >= 0.
 *
 * @generated from message operations_research.sat.IntervalConstraintProto
 */
export type IntervalConstraintProto = Message<"operations_research.sat.IntervalConstraintProto"> & {
    /**
     * @generated from field: operations_research.sat.LinearExpressionProto start = 4;
     */
    start?: LinearExpressionProto;
    /**
     * @generated from field: operations_research.sat.LinearExpressionProto end = 5;
     */
    end?: LinearExpressionProto;
    /**
     * @generated from field: operations_research.sat.LinearExpressionProto size = 6;
     */
    size?: LinearExpressionProto;
};
/**
 * Describes the message operations_research.sat.IntervalConstraintProto.
 * Use `create(IntervalConstraintProtoSchema)` to create a new message.
 */
export declare const IntervalConstraintProtoSchema: GenMessage<IntervalConstraintProto>;
/**
 * All the intervals (index of IntervalConstraintProto) must be disjoint. More
 * formally, there must exist a sequence so that for each consecutive intervals,
 * we have end_i <= start_{i+1}. In particular, intervals of size zero do matter
 * for this constraint. This is also known as a disjunctive constraint in
 * scheduling.
 *
 * @generated from message operations_research.sat.NoOverlapConstraintProto
 */
export type NoOverlapConstraintProto = Message<"operations_research.sat.NoOverlapConstraintProto"> & {
    /**
     * @generated from field: repeated int32 intervals = 1;
     */
    intervals: number[];
};
/**
 * Describes the message operations_research.sat.NoOverlapConstraintProto.
 * Use `create(NoOverlapConstraintProtoSchema)` to create a new message.
 */
export declare const NoOverlapConstraintProtoSchema: GenMessage<NoOverlapConstraintProto>;
/**
 * The boxes defined by [start_x, end_x) * [start_y, end_y) cannot overlap.
 * Furthermore, one box is optional if at least one of the x or y interval is
 * optional.
 *
 * Note that the case of boxes of size zero is special. The following cases
 * violate the constraint:
 *   - a point box inside a box with a non zero area
 *   - a line box overlapping a box with a non zero area
 *   - one vertical line box crossing an horizontal line box.
 *
 * @generated from message operations_research.sat.NoOverlap2DConstraintProto
 */
export type NoOverlap2DConstraintProto = Message<"operations_research.sat.NoOverlap2DConstraintProto"> & {
    /**
     * @generated from field: repeated int32 x_intervals = 1;
     */
    xIntervals: number[];
    /**
     * Same size as x_intervals.
     *
     * @generated from field: repeated int32 y_intervals = 2;
     */
    yIntervals: number[];
};
/**
 * Describes the message operations_research.sat.NoOverlap2DConstraintProto.
 * Use `create(NoOverlap2DConstraintProtoSchema)` to create a new message.
 */
export declare const NoOverlap2DConstraintProtoSchema: GenMessage<NoOverlap2DConstraintProto>;
/**
 * The sum of the demands of the intervals at each interval point cannot exceed
 * a capacity. Note that intervals are interpreted as [start, end) and as
 * such intervals like [2,3) and [3,4) do not overlap for the point of view of
 * this constraint. Moreover, intervals of size zero are ignored.
 *
 * All demands must not contain any negative value in their domains. This is
 * checked at validation. Even if there are no intervals, this constraint
 * implicit enforces capacity >= 0. In other words, a negative capacity is
 * considered valid but always infeasible.
 *
 * @generated from message operations_research.sat.CumulativeConstraintProto
 */
export type CumulativeConstraintProto = Message<"operations_research.sat.CumulativeConstraintProto"> & {
    /**
     * @generated from field: operations_research.sat.LinearExpressionProto capacity = 1;
     */
    capacity?: LinearExpressionProto;
    /**
     * @generated from field: repeated int32 intervals = 2;
     */
    intervals: number[];
    /**
     * Same size as intervals.
     *
     * @generated from field: repeated operations_research.sat.LinearExpressionProto demands = 3;
     */
    demands: LinearExpressionProto[];
};
/**
 * Describes the message operations_research.sat.CumulativeConstraintProto.
 * Use `create(CumulativeConstraintProtoSchema)` to create a new message.
 */
export declare const CumulativeConstraintProtoSchema: GenMessage<CumulativeConstraintProto>;
/**
 * Maintain a reservoir level within bounds. The water level starts at 0, and at
 * any time, it must be within [min_level, max_level].
 *
 * If the variable active_literals[i] is true, and if the expression
 * time_exprs[i] is assigned a value t, then the current level changes by
 * level_changes[i] at the time t. Therefore, at any time t:
 *
 * sum(level_changes[i] * active_literals[i] if time_exprs[i] <= t)
 *   in [min_level, max_level]
 *
 * Note that min level must be <= 0, and the max level must be >= 0. Please use
 * fixed level_changes to simulate initial state.
 *
 * The array of boolean variables 'actives', if defined, indicates which actions
 * are actually performed. If this array is not defined, then it is assumed that
 * all actions will be performed.
 *
 * @generated from message operations_research.sat.ReservoirConstraintProto
 */
export type ReservoirConstraintProto = Message<"operations_research.sat.ReservoirConstraintProto"> & {
    /**
     * @generated from field: int64 min_level = 1;
     */
    minLevel: bigint;
    /**
     * @generated from field: int64 max_level = 2;
     */
    maxLevel: bigint;
    /**
     * @generated from field: repeated operations_research.sat.LinearExpressionProto time_exprs = 3;
     */
    timeExprs: LinearExpressionProto[];
    /**
     * @generated from field: repeated operations_research.sat.LinearExpressionProto level_changes = 6;
     */
    levelChanges: LinearExpressionProto[];
    /**
     * @generated from field: repeated int32 active_literals = 5;
     */
    activeLiterals: number[];
};
/**
 * Describes the message operations_research.sat.ReservoirConstraintProto.
 * Use `create(ReservoirConstraintProtoSchema)` to create a new message.
 */
export declare const ReservoirConstraintProtoSchema: GenMessage<ReservoirConstraintProto>;
/**
 * The circuit constraint is defined on a graph where the arc presence are
 * controlled by literals. Each arc is given by an index in the
 * tails/heads/literals lists that must have the same size.
 *
 * For now, we ignore node indices with no incident arc. All the other nodes
 * must have exactly one incoming and one outgoing selected arc (i.e. literal at
 * true). All the selected arcs that are not self-loops must form a single
 * circuit. Note that multi-arcs are allowed, but only one of them will be true
 * at the same time. Multi-self loop are disallowed though.
 *
 * @generated from message operations_research.sat.CircuitConstraintProto
 */
export type CircuitConstraintProto = Message<"operations_research.sat.CircuitConstraintProto"> & {
    /**
     * @generated from field: repeated int32 tails = 3;
     */
    tails: number[];
    /**
     * @generated from field: repeated int32 heads = 4;
     */
    heads: number[];
    /**
     * @generated from field: repeated int32 literals = 5;
     */
    literals: number[];
};
/**
 * Describes the message operations_research.sat.CircuitConstraintProto.
 * Use `create(CircuitConstraintProtoSchema)` to create a new message.
 */
export declare const CircuitConstraintProtoSchema: GenMessage<CircuitConstraintProto>;
/**
 * The "VRP" (Vehicle Routing Problem) constraint.
 *
 * The direct graph where arc #i (from tails[i] to head[i]) is present iff
 * literals[i] is true must satisfy this set of properties:
 * - #incoming arcs == 1 except for node 0.
 * - #outgoing arcs == 1 except for node 0.
 * - for node zero, #incoming arcs == #outgoing arcs.
 * - There are no duplicate arcs.
 * - Self-arcs are allowed except for node 0.
 * - There is no cycle in this graph, except through node 0.
 *
 * Note: Currently this constraint expects all the nodes in [0, num_nodes) to
 * have at least one incident arc. The model will be considered invalid if it
 * is not the case. You can add self-arc fixed to one to ignore some nodes if
 * needed.
 *
 * TODO(user): It is probably possible to generalize this constraint to a
 * no-cycle in a general graph, or a no-cycle with sum incoming <= 1 and sum
 * outgoing <= 1 (more efficient implementation). On the other hand, having this
 * specific constraint allow us to add specific "cuts" to a VRP problem.
 *
 * @generated from message operations_research.sat.RoutesConstraintProto
 */
export type RoutesConstraintProto = Message<"operations_research.sat.RoutesConstraintProto"> & {
    /**
     * @generated from field: repeated int32 tails = 1;
     */
    tails: number[];
    /**
     * @generated from field: repeated int32 heads = 2;
     */
    heads: number[];
    /**
     * @generated from field: repeated int32 literals = 3;
     */
    literals: number[];
    /**
     * DEPRECATED. These fields are no longer used. The solver ignores them.
     *
     * @generated from field: repeated int32 demands = 4;
     */
    demands: number[];
    /**
     * @generated from field: int64 capacity = 5;
     */
    capacity: bigint;
    /**
     * Expressions associated with the nodes of the graph, such as the load of the
     * vehicle arriving at a node, or the time at which a vehicle arrives at a
     * node. Expressions with the same "dimension" (such as "load" or "time") must
     * be listed together.
     * This field is optional. If it is set, the linear constraints of size 1 or 2
     * between the variables in these expressions will be used to derive cuts for
     * this constraint. If it is not set, the solver will try to automatically
     * derive it, from the linear constraints of size 1 or 2 in the model (this
     * can fail in complex cases).
     *
     * @generated from field: repeated operations_research.sat.RoutesConstraintProto.NodeExpressions dimensions = 6;
     */
    dimensions: RoutesConstraintProto_NodeExpressions[];
};
/**
 * Describes the message operations_research.sat.RoutesConstraintProto.
 * Use `create(RoutesConstraintProtoSchema)` to create a new message.
 */
export declare const RoutesConstraintProtoSchema: GenMessage<RoutesConstraintProto>;
/**
 * A set of linear expressions associated with the nodes.
 *
 * @generated from message operations_research.sat.RoutesConstraintProto.NodeExpressions
 */
export type RoutesConstraintProto_NodeExpressions = Message<"operations_research.sat.RoutesConstraintProto.NodeExpressions"> & {
    /**
     * The i-th element is the linear expression associated with the i-th node.
     *
     * @generated from field: repeated operations_research.sat.LinearExpressionProto exprs = 1;
     */
    exprs: LinearExpressionProto[];
};
/**
 * Describes the message operations_research.sat.RoutesConstraintProto.NodeExpressions.
 * Use `create(RoutesConstraintProto_NodeExpressionsSchema)` to create a new message.
 */
export declare const RoutesConstraintProto_NodeExpressionsSchema: GenMessage<RoutesConstraintProto_NodeExpressions>;
/**
 * The values of the n-tuple formed by the given expression can only be one of
 * the listed n-tuples in values. The n-tuples are encoded in a flattened way:
 *     [tuple0_v0, tuple0_v1, ..., tuple0_v{n-1}, tuple1_v0, ...].
 * Corner cases:
 *  - If all `vars`, `values` and `exprs` are empty, the constraint is trivially
 *    true, irrespective of the value of `negated`.
 *  - If `values` is empty but either vars or exprs is not, the constraint is
 *    trivially false if `negated` is false, and trivially true if `negated` is
 *    true.
 *  - If `vars` and `exprs` are empty but `values` is not, the model is invalid.
 *
 * @generated from message operations_research.sat.TableConstraintProto
 */
export type TableConstraintProto = Message<"operations_research.sat.TableConstraintProto"> & {
    /**
     * Legacy field.
     *
     * @generated from field: repeated int32 vars = 1;
     */
    vars: number[];
    /**
     * @generated from field: repeated int64 values = 2;
     */
    values: bigint[];
    /**
     * @generated from field: repeated operations_research.sat.LinearExpressionProto exprs = 4;
     */
    exprs: LinearExpressionProto[];
    /**
     * If true, the meaning is "negated", that is we forbid any of the given
     * tuple from a feasible assignment.
     *
     * @generated from field: bool negated = 3;
     */
    negated: boolean;
};
/**
 * Describes the message operations_research.sat.TableConstraintProto.
 * Use `create(TableConstraintProtoSchema)` to create a new message.
 */
export declare const TableConstraintProtoSchema: GenMessage<TableConstraintProto>;
/**
 * The two arrays of variable each represent a function, the second is the
 * inverse of the first: f_direct[i] == j <=> f_inverse[j] == i.
 *
 * @generated from message operations_research.sat.InverseConstraintProto
 */
export type InverseConstraintProto = Message<"operations_research.sat.InverseConstraintProto"> & {
    /**
     * @generated from field: repeated int32 f_direct = 1;
     */
    fDirect: number[];
    /**
     * @generated from field: repeated int32 f_inverse = 2;
     */
    fInverse: number[];
};
/**
 * Describes the message operations_research.sat.InverseConstraintProto.
 * Use `create(InverseConstraintProtoSchema)` to create a new message.
 */
export declare const InverseConstraintProtoSchema: GenMessage<InverseConstraintProto>;
/**
 * This constraint forces a sequence of expressions to be accepted by an
 * automaton.
 *
 * @generated from message operations_research.sat.AutomatonConstraintProto
 */
export type AutomatonConstraintProto = Message<"operations_research.sat.AutomatonConstraintProto"> & {
    /**
     * A state is identified by a non-negative number. It is preferable to keep
     * all the states dense in says [0, num_states). The automaton starts at
     * starting_state and must finish in any of the final states.
     *
     * @generated from field: int64 starting_state = 2;
     */
    startingState: bigint;
    /**
     * @generated from field: repeated int64 final_states = 3;
     */
    finalStates: bigint[];
    /**
     * List of transitions (all 3 vectors have the same size). Both tail and head
     * are states, label is any variable value. No two outgoing transitions from
     * the same state can have the same label.
     *
     * @generated from field: repeated int64 transition_tail = 4;
     */
    transitionTail: bigint[];
    /**
     * @generated from field: repeated int64 transition_head = 5;
     */
    transitionHead: bigint[];
    /**
     * @generated from field: repeated int64 transition_label = 6;
     */
    transitionLabel: bigint[];
    /**
     * Legacy field.
     *
     * @generated from field: repeated int32 vars = 7;
     */
    vars: number[];
    /**
     * The sequence of expressions. The automaton is ran for exprs_size() "steps"
     * and the value of exprs[i] corresponds to the transition label at step i.
     *
     * @generated from field: repeated operations_research.sat.LinearExpressionProto exprs = 8;
     */
    exprs: LinearExpressionProto[];
};
/**
 * Describes the message operations_research.sat.AutomatonConstraintProto.
 * Use `create(AutomatonConstraintProtoSchema)` to create a new message.
 */
export declare const AutomatonConstraintProtoSchema: GenMessage<AutomatonConstraintProto>;
/**
 * A list of variables, without any semantics.
 *
 * @generated from message operations_research.sat.ListOfVariablesProto
 */
export type ListOfVariablesProto = Message<"operations_research.sat.ListOfVariablesProto"> & {
    /**
     * @generated from field: repeated int32 vars = 1;
     */
    vars: number[];
};
/**
 * Describes the message operations_research.sat.ListOfVariablesProto.
 * Use `create(ListOfVariablesProtoSchema)` to create a new message.
 */
export declare const ListOfVariablesProtoSchema: GenMessage<ListOfVariablesProto>;
/**
 * Next id: 31
 *
 * @generated from message operations_research.sat.ConstraintProto
 */
export type ConstraintProto = Message<"operations_research.sat.ConstraintProto"> & {
    /**
     * For debug/logging only. Can be empty.
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * The constraint will be enforced iff all literals listed here are true. If
     * this is empty, then the constraint will always be enforced. An enforced
     * constraint must be satisfied, and an un-enforced one will simply be
     * ignored.
     *
     * This is also called half-reification. To have an equivalence between a
     * literal and a constraint (full reification), one must add both a constraint
     * (controlled by a literal l) and its negation (controlled by the negation of
     * l).
     *
     * Important: as of September 2025, some constraints might be less efficient
     * with enforcement than without: circuit, routes, no_overlap, no_overlap_2d,
     * and cumulative. If performance is not great, consider using a model without
     * these constraints enforced.
     *
     * @generated from field: repeated int32 enforcement_literal = 2;
     */
    enforcementLiteral: number[];
    /**
     * The actual constraint with its arguments.
     *
     * @generated from oneof operations_research.sat.ConstraintProto.constraint
     */
    constraint: {
        /**
         * The bool_or constraint forces at least one literal to be true.
         *
         * @generated from field: operations_research.sat.BoolArgumentProto bool_or = 3;
         */
        value: BoolArgumentProto;
        case: "boolOr";
    } | {
        /**
         * The bool_and constraint forces all of the literals to be true.
         *
         * This is a "redundant" constraint in the sense that this can easily be
         * encoded with many bool_or or at_most_one. It is just more space efficient
         * and handled slightly differently internally.
         *
         * @generated from field: operations_research.sat.BoolArgumentProto bool_and = 4;
         */
        value: BoolArgumentProto;
        case: "boolAnd";
    } | {
        /**
         * The at_most_one constraint enforces that no more than one literal is
         * true at the same time.
         *
         * Note that an at most one constraint of length n could be encoded with n
         * bool_and constraint with n-1 term on the right hand side. So in a sense,
         * this constraint contribute directly to the "implication-graph" or the
         * 2-SAT part of the model.
         *
         * @generated from field: operations_research.sat.BoolArgumentProto at_most_one = 26;
         */
        value: BoolArgumentProto;
        case: "atMostOne";
    } | {
        /**
         * The exactly_one constraint force exactly one literal to true and no more.
         *
         * Anytime a bool_or (it could have been called at_least_one) is included
         * into an at_most_one, then the bool_or is actually an exactly one
         * constraint, and the extra literal in the at_most_one can be set to false.
         * So in this sense, this constraint is not really needed. it is just here
         * for a better description of the problem structure and to facilitate some
         * algorithm.
         *
         * @generated from field: operations_research.sat.BoolArgumentProto exactly_one = 29;
         */
        value: BoolArgumentProto;
        case: "exactlyOne";
    } | {
        /**
         * The bool_xor constraint forces an odd number of the literals to be true.
         *
         * @generated from field: operations_research.sat.BoolArgumentProto bool_xor = 5;
         */
        value: BoolArgumentProto;
        case: "boolXor";
    } | {
        /**
         * The int_div constraint forces the target to equal exprs[0] / exprs[1].
         * The division is "rounded" towards zero, so we can have for instance
         * (2 = 12 / 5) or (-3 = -10 / 3). If you only want exact integer division,
         * then you should use instead of t = a / b, the int_prod constraint
         * a = b * t.
         *
         * If 0 belongs to the domain of exprs[1], then the model is deemed invalid.
         *
         * @generated from field: operations_research.sat.LinearArgumentProto int_div = 7;
         */
        value: LinearArgumentProto;
        case: "intDiv";
    } | {
        /**
         * The int_mod constraint forces the target to equal exprs[0] % exprs[1].
         * The domain of exprs[1] must be strictly positive. The sign of the target
         * is the same as the sign of exprs[0].
         *
         * @generated from field: operations_research.sat.LinearArgumentProto int_mod = 8;
         */
        value: LinearArgumentProto;
        case: "intMod";
    } | {
        /**
         * The int_prod constraint forces the target to equal the product of all
         * variables. By convention, because we can just remove term equal to one,
         * the empty product forces the target to be one.
         *
         * Note that the solver checks for potential integer overflow. So the
         * product of the maximum absolute value of all the terms (using the initial
         * domain) should fit on an int64. Otherwise the model will be declared
         * invalid.
         *
         * @generated from field: operations_research.sat.LinearArgumentProto int_prod = 11;
         */
        value: LinearArgumentProto;
        case: "intProd";
    } | {
        /**
         * The lin_max constraint forces the target to equal the maximum of all
         * linear expressions.
         * Note that this can model a minimum simply by negating all expressions.
         *
         * @generated from field: operations_research.sat.LinearArgumentProto lin_max = 27;
         */
        value: LinearArgumentProto;
        case: "linMax";
    } | {
        /**
         * The linear constraint enforces a linear inequality among the variables,
         * such as 0 <= x + 2y <= 10.
         *
         * @generated from field: operations_research.sat.LinearConstraintProto linear = 12;
         */
        value: LinearConstraintProto;
        case: "linear";
    } | {
        /**
         * The all_diff constraint forces all variables to take different values.
         *
         * @generated from field: operations_research.sat.AllDifferentConstraintProto all_diff = 13;
         */
        value: AllDifferentConstraintProto;
        case: "allDiff";
    } | {
        /**
         * The element constraint forces the variable with the given index
         * to be equal to the target.
         *
         * @generated from field: operations_research.sat.ElementConstraintProto element = 14;
         */
        value: ElementConstraintProto;
        case: "element";
    } | {
        /**
         * The circuit constraint takes a graph and forces the arcs present
         * (with arc presence indicated by a literal) to form a unique cycle.
         *
         * @generated from field: operations_research.sat.CircuitConstraintProto circuit = 15;
         */
        value: CircuitConstraintProto;
        case: "circuit";
    } | {
        /**
         * The routes constraint implements the vehicle routing problem.
         *
         * @generated from field: operations_research.sat.RoutesConstraintProto routes = 23;
         */
        value: RoutesConstraintProto;
        case: "routes";
    } | {
        /**
         * The table constraint enforces what values a tuple of variables may
         * take.
         *
         * @generated from field: operations_research.sat.TableConstraintProto table = 16;
         */
        value: TableConstraintProto;
        case: "table";
    } | {
        /**
         * The automaton constraint forces a sequence of variables to be accepted
         * by an automaton.
         *
         * @generated from field: operations_research.sat.AutomatonConstraintProto automaton = 17;
         */
        value: AutomatonConstraintProto;
        case: "automaton";
    } | {
        /**
         * The inverse constraint forces two arrays to be inverses of each other:
         * the values of one are the indices of the other, and vice versa.
         *
         * @generated from field: operations_research.sat.InverseConstraintProto inverse = 18;
         */
        value: InverseConstraintProto;
        case: "inverse";
    } | {
        /**
         * The reservoir constraint forces the sum of a set of active demands
         * to always be between a specified minimum and maximum value during
         * specific times.
         *
         * @generated from field: operations_research.sat.ReservoirConstraintProto reservoir = 24;
         */
        value: ReservoirConstraintProto;
        case: "reservoir";
    } | {
        /**
         * The interval constraint takes a start, end, and size, and forces
         * start + size == end.
         *
         * @generated from field: operations_research.sat.IntervalConstraintProto interval = 19;
         */
        value: IntervalConstraintProto;
        case: "interval";
    } | {
        /**
         * The no_overlap constraint prevents a set of intervals from
         * overlapping; in scheduling, this is called a disjunctive
         * constraint.
         *
         * @generated from field: operations_research.sat.NoOverlapConstraintProto no_overlap = 20;
         */
        value: NoOverlapConstraintProto;
        case: "noOverlap";
    } | {
        /**
         * The no_overlap_2d constraint prevents a set of boxes from overlapping.
         *
         * @generated from field: operations_research.sat.NoOverlap2DConstraintProto no_overlap_2d = 21;
         */
        value: NoOverlap2DConstraintProto;
        case: "noOverlap2d";
    } | {
        /**
         * The cumulative constraint ensures that for any integer point, the sum
         * of the demands of the intervals containing that point does not exceed
         * the capacity.
         *
         * @generated from field: operations_research.sat.CumulativeConstraintProto cumulative = 22;
         */
        value: CumulativeConstraintProto;
        case: "cumulative";
    } | {
        /**
         * This constraint is not meant to be used and will be rejected by the
         * solver. It is meant to mark variable when testing the presolve code.
         *
         * @generated from field: operations_research.sat.ListOfVariablesProto dummy_constraint = 30;
         */
        value: ListOfVariablesProto;
        case: "dummyConstraint";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message operations_research.sat.ConstraintProto.
 * Use `create(ConstraintProtoSchema)` to create a new message.
 */
export declare const ConstraintProtoSchema: GenMessage<ConstraintProto>;
/**
 * Optimization objective.
 *
 * @generated from message operations_research.sat.CpObjectiveProto
 */
export type CpObjectiveProto = Message<"operations_research.sat.CpObjectiveProto"> & {
    /**
     * The linear terms of the objective to minimize.
     * For a maximization problem, one can negate all coefficients in the
     * objective and set scaling_factor to -1.
     *
     * @generated from field: repeated int32 vars = 1;
     */
    vars: number[];
    /**
     * @generated from field: repeated int64 coeffs = 4;
     */
    coeffs: bigint[];
    /**
     * The displayed objective is always:
     *   scaling_factor * (sum(coefficients[i] * objective_vars[i]) + offset).
     * This is needed to have a consistent objective after presolve or when
     * scaling a double problem to express it with integers.
     *
     * Note that if scaling_factor is zero, then it is assumed to be 1, so that by
     * default these fields have no effect.
     *
     * @generated from field: double offset = 2;
     */
    offset: number;
    /**
     * @generated from field: double scaling_factor = 3;
     */
    scalingFactor: number;
    /**
     * If non-empty, only look for an objective value in the given domain.
     * Note that this does not depend on the offset or scaling factor, it is a
     * domain on the sum of the objective terms only.
     *
     * @generated from field: repeated int64 domain = 5;
     */
    domain: bigint[];
    /**
     * Internal field. Do not set. When we scale a FloatObjectiveProto to a
     * integer version, we set this to true if the scaling was exact (i.e. all
     * original coeff were integer for instance).
     *
     * TODO(user): Put the error bounds we computed instead?
     *
     * @generated from field: bool scaling_was_exact = 6;
     */
    scalingWasExact: boolean;
    /**
     * Internal fields to recover a bound on the original integer objective from
     * the presolved one. Basically, initially the integer objective fit on an
     * int64 and is in [Initial_lb, Initial_ub]. During presolve, we might change
     * the linear expression to have a new domain [Presolved_lb, Presolved_ub]
     * that will also always fit on an int64.
     *
     * The two domain will always be linked with an affine transformation between
     * the two of the form:
     *   old = (new + before_offset) * integer_scaling_factor + after_offset.
     * Note that we use both offsets to always be able to do the computation while
     * staying in the int64 domain. In particular, the after_offset will always
     * be in (-integer_scaling_factor, integer_scaling_factor).
     *
     * @generated from field: int64 integer_before_offset = 7;
     */
    integerBeforeOffset: bigint;
    /**
     * @generated from field: int64 integer_after_offset = 9;
     */
    integerAfterOffset: bigint;
    /**
     * @generated from field: int64 integer_scaling_factor = 8;
     */
    integerScalingFactor: bigint;
};
/**
 * Describes the message operations_research.sat.CpObjectiveProto.
 * Use `create(CpObjectiveProtoSchema)` to create a new message.
 */
export declare const CpObjectiveProtoSchema: GenMessage<CpObjectiveProto>;
/**
 * A linear floating point objective: sum coeffs[i] * vars[i] + offset.
 * Note that the variable can only still take integer value.
 *
 * @generated from message operations_research.sat.FloatObjectiveProto
 */
export type FloatObjectiveProto = Message<"operations_research.sat.FloatObjectiveProto"> & {
    /**
     * @generated from field: repeated int32 vars = 1;
     */
    vars: number[];
    /**
     * @generated from field: repeated double coeffs = 2;
     */
    coeffs: number[];
    /**
     * @generated from field: double offset = 3;
     */
    offset: number;
    /**
     * The optimization direction. The default is to minimize
     *
     * @generated from field: bool maximize = 4;
     */
    maximize: boolean;
};
/**
 * Describes the message operations_research.sat.FloatObjectiveProto.
 * Use `create(FloatObjectiveProtoSchema)` to create a new message.
 */
export declare const FloatObjectiveProtoSchema: GenMessage<FloatObjectiveProto>;
/**
 * Define the strategy to follow when the solver needs to take a new decision.
 * Note that this strategy is only defined on a subset of variables.
 *
 * @generated from message operations_research.sat.DecisionStrategyProto
 */
export type DecisionStrategyProto = Message<"operations_research.sat.DecisionStrategyProto"> & {
    /**
     * The variables to be considered for the next decision. The order matter and
     * is always used as a tie-breaker after the variable selection strategy
     * criteria defined below.
     *
     * @generated from field: repeated int32 variables = 1;
     */
    variables: number[];
    /**
     * If this is set, then the variables field must be empty.
     * We currently only support affine expression.
     *
     * Note that this is needed so that if a variable has an affine
     * representative, we can properly transform a DecisionStrategyProto through
     * presolve.
     *
     * @generated from field: repeated operations_research.sat.LinearExpressionProto exprs = 5;
     */
    exprs: LinearExpressionProto[];
    /**
     * @generated from field: operations_research.sat.DecisionStrategyProto.VariableSelectionStrategy variable_selection_strategy = 2;
     */
    variableSelectionStrategy: DecisionStrategyProto_VariableSelectionStrategy;
    /**
     * @generated from field: operations_research.sat.DecisionStrategyProto.DomainReductionStrategy domain_reduction_strategy = 3;
     */
    domainReductionStrategy: DecisionStrategyProto_DomainReductionStrategy;
};
/**
 * Describes the message operations_research.sat.DecisionStrategyProto.
 * Use `create(DecisionStrategyProtoSchema)` to create a new message.
 */
export declare const DecisionStrategyProtoSchema: GenMessage<DecisionStrategyProto>;
/**
 * The order in which the variables (resp. affine expression) above should be
 * considered. Note that only variables that are not already fixed are
 * considered.
 *
 * TODO(user): extend as needed.
 *
 * @generated from enum operations_research.sat.DecisionStrategyProto.VariableSelectionStrategy
 */
export declare enum DecisionStrategyProto_VariableSelectionStrategy {
    /**
     * @generated from enum value: CHOOSE_FIRST = 0;
     */
    CHOOSE_FIRST = 0,
    /**
     * @generated from enum value: CHOOSE_LOWEST_MIN = 1;
     */
    CHOOSE_LOWEST_MIN = 1,
    /**
     * @generated from enum value: CHOOSE_HIGHEST_MAX = 2;
     */
    CHOOSE_HIGHEST_MAX = 2,
    /**
     * @generated from enum value: CHOOSE_MIN_DOMAIN_SIZE = 3;
     */
    CHOOSE_MIN_DOMAIN_SIZE = 3,
    /**
     * @generated from enum value: CHOOSE_MAX_DOMAIN_SIZE = 4;
     */
    CHOOSE_MAX_DOMAIN_SIZE = 4
}
/**
 * Describes the enum operations_research.sat.DecisionStrategyProto.VariableSelectionStrategy.
 */
export declare const DecisionStrategyProto_VariableSelectionStrategySchema: GenEnum<DecisionStrategyProto_VariableSelectionStrategy>;
/**
 * Once a variable (resp. affine expression) has been chosen, this enum
 * describe what decision is taken on its domain.
 *
 * TODO(user): extend as needed.
 *
 * @generated from enum operations_research.sat.DecisionStrategyProto.DomainReductionStrategy
 */
export declare enum DecisionStrategyProto_DomainReductionStrategy {
    /**
     * @generated from enum value: SELECT_MIN_VALUE = 0;
     */
    SELECT_MIN_VALUE = 0,
    /**
     * @generated from enum value: SELECT_MAX_VALUE = 1;
     */
    SELECT_MAX_VALUE = 1,
    /**
     * @generated from enum value: SELECT_LOWER_HALF = 2;
     */
    SELECT_LOWER_HALF = 2,
    /**
     * @generated from enum value: SELECT_UPPER_HALF = 3;
     */
    SELECT_UPPER_HALF = 3,
    /**
     * @generated from enum value: SELECT_MEDIAN_VALUE = 4;
     */
    SELECT_MEDIAN_VALUE = 4,
    /**
     * @generated from enum value: SELECT_RANDOM_HALF = 5;
     */
    SELECT_RANDOM_HALF = 5
}
/**
 * Describes the enum operations_research.sat.DecisionStrategyProto.DomainReductionStrategy.
 */
export declare const DecisionStrategyProto_DomainReductionStrategySchema: GenEnum<DecisionStrategyProto_DomainReductionStrategy>;
/**
 * This message encodes a partial (or full) assignment of the variables of a
 * CpModelProto. The variable indices should be unique and valid variable
 * indices.
 *
 * @generated from message operations_research.sat.PartialVariableAssignment
 */
export type PartialVariableAssignment = Message<"operations_research.sat.PartialVariableAssignment"> & {
    /**
     * @generated from field: repeated int32 vars = 1;
     */
    vars: number[];
    /**
     * @generated from field: repeated int64 values = 2;
     */
    values: bigint[];
};
/**
 * Describes the message operations_research.sat.PartialVariableAssignment.
 * Use `create(PartialVariableAssignmentSchema)` to create a new message.
 */
export declare const PartialVariableAssignmentSchema: GenMessage<PartialVariableAssignment>;
/**
 * A permutation of integers encoded as a list of cycles, hence the "sparse"
 * format. The image of an element cycle[i] is cycle[(i + 1) % cycle_length].
 *
 * @generated from message operations_research.sat.SparsePermutationProto
 */
export type SparsePermutationProto = Message<"operations_research.sat.SparsePermutationProto"> & {
    /**
     * Each cycle is listed one after the other in the support field.
     * The size of each cycle is given (in order) in the cycle_sizes field.
     *
     * @generated from field: repeated int32 support = 1;
     */
    support: number[];
    /**
     * @generated from field: repeated int32 cycle_sizes = 2;
     */
    cycleSizes: number[];
};
/**
 * Describes the message operations_research.sat.SparsePermutationProto.
 * Use `create(SparsePermutationProtoSchema)` to create a new message.
 */
export declare const SparsePermutationProtoSchema: GenMessage<SparsePermutationProto>;
/**
 * A dense matrix of numbers encoded in a flat way, row by row.
 * That is matrix[i][j] = entries[i * num_cols + j];
 *
 * @generated from message operations_research.sat.DenseMatrixProto
 */
export type DenseMatrixProto = Message<"operations_research.sat.DenseMatrixProto"> & {
    /**
     * @generated from field: int32 num_rows = 1;
     */
    numRows: number;
    /**
     * @generated from field: int32 num_cols = 2;
     */
    numCols: number;
    /**
     * @generated from field: repeated int32 entries = 3;
     */
    entries: number[];
};
/**
 * Describes the message operations_research.sat.DenseMatrixProto.
 * Use `create(DenseMatrixProtoSchema)` to create a new message.
 */
export declare const DenseMatrixProtoSchema: GenMessage<DenseMatrixProto>;
/**
 * EXPERIMENTAL. For now, this is meant to be used by the solver and not filled
 * by clients.
 *
 * Hold symmetry information about the set of feasible solutions. If we permute
 * the variable values of any feasible solution using one of the permutation
 * described here, we should always get another feasible solution.
 *
 * We usually also enforce that the objective of the new solution is the same.
 *
 * The group of permutations encoded here is usually computed from the encoding
 * of the model, so it is not meant to be a complete representation of the
 * feasible solution symmetries, just a valid subgroup.
 *
 * @generated from message operations_research.sat.SymmetryProto
 */
export type SymmetryProto = Message<"operations_research.sat.SymmetryProto"> & {
    /**
     * A list of variable indices permutations that leave the feasible space of
     * solution invariant. Usually, we only encode a set of generators of the
     * group.
     *
     * @generated from field: repeated operations_research.sat.SparsePermutationProto permutations = 1;
     */
    permutations: SparsePermutationProto[];
    /**
     * An orbitope is a special symmetry structure of the solution space. If the
     * variable indices are arranged in a matrix (with no duplicates), then any
     * permutation of the columns will be a valid permutation of the feasible
     * space.
     *
     * This arise quite often. The typical example is a graph coloring problem
     * where for each node i, you have j booleans to indicate its color. If the
     * variables color_of_i_is_j are arranged in a matrix[i][j], then any columns
     * permutations leave the problem invariant.
     *
     * @generated from field: repeated operations_research.sat.DenseMatrixProto orbitopes = 2;
     */
    orbitopes: DenseMatrixProto[];
};
/**
 * Describes the message operations_research.sat.SymmetryProto.
 * Use `create(SymmetryProtoSchema)` to create a new message.
 */
export declare const SymmetryProtoSchema: GenMessage<SymmetryProto>;
/**
 * A constraint programming problem.
 *
 * @generated from message operations_research.sat.CpModelProto
 */
export type CpModelProto = Message<"operations_research.sat.CpModelProto"> & {
    /**
     * For debug/logging only. Can be empty.
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * The associated Protos should be referred by their index in these fields.
     *
     * @generated from field: repeated operations_research.sat.IntegerVariableProto variables = 2;
     */
    variables: IntegerVariableProto[];
    /**
     * @generated from field: repeated operations_research.sat.ConstraintProto constraints = 3;
     */
    constraints: ConstraintProto[];
    /**
     * The objective to minimize. Can be empty for pure decision problems.
     *
     * @generated from field: operations_research.sat.CpObjectiveProto objective = 4;
     */
    objective?: CpObjectiveProto;
    /**
     * Advanced usage.
     * It is invalid to have both an objective and a floating point objective.
     *
     * The objective of the model, in floating point format. The solver will
     * automatically scale this to integer during expansion and thus convert it to
     * a normal CpObjectiveProto. See the mip* parameters to control how this is
     * scaled. In most situation the precision will be good enough, but you can
     * see the logs to see what are the precision guaranteed when this is
     * converted to a fixed point representation.
     *
     * Note that even if the precision is bad, the returned objective_value and
     * best_objective_bound will be computed correctly. So at the end of the solve
     * you can check the gap if you only want precise optimal.
     *
     * @generated from field: operations_research.sat.FloatObjectiveProto floating_point_objective = 9;
     */
    floatingPointObjective?: FloatObjectiveProto;
    /**
     * Defines the strategy that the solver should follow when the
     * search_branching parameter is set to FIXED_SEARCH. Note that this strategy
     * is also used as a heuristic when we are not in fixed search.
     *
     * Advanced Usage: if not all variables appears and the parameter
     * "instantiate_all_variables" is set to false, then the solver will not try
     * to instantiate the variables that do not appear. Thus, at the end of the
     * search, not all variables may be fixed. Currently, we will set them to
     * their lower bound in the solution.
     *
     * @generated from field: repeated operations_research.sat.DecisionStrategyProto search_strategy = 5;
     */
    searchStrategy: DecisionStrategyProto[];
    /**
     * Solution hint.
     *
     * If a feasible or almost-feasible solution to the problem is already known,
     * it may be helpful to pass it to the solver so that it can be used. The
     * solver will try to use this information to create its initial feasible
     * solution.
     *
     * Note that it may not always be faster to give a hint like this to the
     * solver. There is also no guarantee that the solver will use this hint or
     * try to return a solution "close" to this assignment in case of multiple
     * optimal solutions.
     *
     * @generated from field: operations_research.sat.PartialVariableAssignment solution_hint = 6;
     */
    solutionHint?: PartialVariableAssignment;
    /**
     * A list of literals. The model will be solved assuming all these literals
     * are true. Compared to just fixing the domain of these literals, using this
     * mechanism is slower but allows in case the model is INFEASIBLE to get a
     * potentially small subset of them that can be used to explain the
     * infeasibility.
     *
     * Think (IIS), except when you are only concerned by the provided
     * assumptions. This is powerful as it allows to group a set of logically
     * related constraint under only one enforcement literal which can potentially
     * give you a good and interpretable explanation for infeasiblity.
     *
     * Such infeasibility explanation will be available in the
     * sufficient_assumptions_for_infeasibility response field.
     *
     * @generated from field: repeated int32 assumptions = 7;
     */
    assumptions: number[];
    /**
     * For now, this is not meant to be filled by a client writing a model, but
     * by our preprocessing step.
     *
     * Information about the symmetries of the feasible solution space.
     * These usually leaves the objective invariant.
     *
     * @generated from field: operations_research.sat.SymmetryProto symmetry = 8;
     */
    symmetry?: SymmetryProto;
};
/**
 * Describes the message operations_research.sat.CpModelProto.
 * Use `create(CpModelProtoSchema)` to create a new message.
 */
export declare const CpModelProtoSchema: GenMessage<CpModelProto>;
/**
 * Just a message used to store dense solution.
 * This is used by the additional_solutions field.
 *
 * @generated from message operations_research.sat.CpSolverSolution
 */
export type CpSolverSolution = Message<"operations_research.sat.CpSolverSolution"> & {
    /**
     * @generated from field: repeated int64 values = 1;
     */
    values: bigint[];
};
/**
 * Describes the message operations_research.sat.CpSolverSolution.
 * Use `create(CpSolverSolutionSchema)` to create a new message.
 */
export declare const CpSolverSolutionSchema: GenMessage<CpSolverSolution>;
/**
 * The response returned by a solver trying to solve a CpModelProto.
 *
 * Next id: 32
 *
 * @generated from message operations_research.sat.CpSolverResponse
 */
export type CpSolverResponse = Message<"operations_research.sat.CpSolverResponse"> & {
    /**
     * The status of the solve.
     *
     * @generated from field: operations_research.sat.CpSolverStatus status = 1;
     */
    status: CpSolverStatus;
    /**
     * A feasible solution to the given problem. Depending on the returned status
     * it may be optimal or just feasible. This is in one-to-one correspondence
     * with a CpModelProto::variables repeated field and list the values of all
     * the variables.
     *
     * @generated from field: repeated int64 solution = 2;
     */
    solution: bigint[];
    /**
     * Only make sense for an optimization problem. The objective value of the
     * returned solution if it is non-empty. If there is no solution, then for a
     * minimization problem, this will be an upper-bound of the objective of any
     * feasible solution, and a lower-bound for a maximization problem.
     *
     * @generated from field: double objective_value = 3;
     */
    objectiveValue: number;
    /**
     * Only make sense for an optimization problem. A proven lower-bound on the
     * objective for a minimization problem, or a proven upper-bound for a
     * maximization problem.
     *
     * @generated from field: double best_objective_bound = 4;
     */
    bestObjectiveBound: number;
    /**
     * If the parameter fill_additional_solutions_in_response is set, then we
     * copy all the solutions from our internal solution pool here.
     *
     * Note that the one returned in the solution field will likely appear here
     * too. Do not rely on the solutions order as it depends on our internal
     * representation (after postsolve).
     *
     * @generated from field: repeated operations_research.sat.CpSolverSolution additional_solutions = 27;
     */
    additionalSolutions: CpSolverSolution[];
    /**
     * Advanced usage.
     *
     * If the option fill_tightened_domains_in_response is set, then this field
     * will be a copy of the CpModelProto.variables where each domain has been
     * reduced using the information the solver was able to derive. Note that this
     * is only filled with the info derived during a normal search and we do not
     * have any dedicated algorithm to improve it.
     *
     * Warning: if you didn't set keep_all_feasible_solutions_in_presolve, then
     * these domains might exclude valid feasible solution. Otherwise for a
     * feasibility problem, all feasible solution should be there.
     *
     * Warning: For an optimization problem, these will correspond to valid bounds
     * for the problem of finding an improving solution to the best one found so
     * far. It might be better to solve a feasibility version if one just want to
     * explore the feasible region.
     *
     * @generated from field: repeated operations_research.sat.IntegerVariableProto tightened_variables = 21;
     */
    tightenedVariables: IntegerVariableProto[];
    /**
     * A subset of the model "assumptions" field. This will only be filled if the
     * status is INFEASIBLE. This subset of assumption will be enough to still get
     * an infeasible problem.
     *
     * This is related to what is called the irreducible inconsistent subsystem or
     * IIS. Except one is only concerned by the provided assumptions. There is
     * also no guarantee that we return an irreducible (aka minimal subset).
     * However, this is based on SAT explanation and there is a good chance it is
     * not too large.
     *
     * If you really want a minimal subset, a possible way to get one is by
     * changing your model to minimize the number of assumptions at false, but
     * this is likely an harder problem to solve.
     *
     * Important: Currently, this is minimized only in single-thread and if the
     * problem is not an optimization problem, otherwise, it will always include
     * all the assumptions.
     *
     * TODO(user): Allows for returning multiple core at once.
     *
     * @generated from field: repeated int32 sufficient_assumptions_for_infeasibility = 23;
     */
    sufficientAssumptionsForInfeasibility: number[];
    /**
     * Contains the integer objective optimized internally. This is only filled if
     * the problem had a floating point objective, and on the final response, not
     * the ones given to callbacks.
     *
     * @generated from field: operations_research.sat.CpObjectiveProto integer_objective = 28;
     */
    integerObjective?: CpObjectiveProto;
    /**
     * Advanced usage.
     *
     * A lower bound on the integer expression of the objective. This is either a
     * bound on the expression in the returned integer_objective or on the integer
     * expression of the original objective if the problem already has an integer
     * objective.
     *
     * TODO(user): This should be renamed integer_objective_lower_bound.
     *
     * @generated from field: int64 inner_objective_lower_bound = 29;
     */
    innerObjectiveLowerBound: bigint;
    /**
     * Some statistics about the solve.
     *
     * Important: in multithread, this correspond the statistics of the first
     * subsolver. Which is usually the one with the user defined parameters. Or
     * the default-search if none are specified.
     *
     * @generated from field: int64 num_integers = 30;
     */
    numIntegers: bigint;
    /**
     * @generated from field: int64 num_booleans = 10;
     */
    numBooleans: bigint;
    /**
     * @generated from field: int64 num_fixed_booleans = 31;
     */
    numFixedBooleans: bigint;
    /**
     * @generated from field: int64 num_conflicts = 11;
     */
    numConflicts: bigint;
    /**
     * @generated from field: int64 num_branches = 12;
     */
    numBranches: bigint;
    /**
     * @generated from field: int64 num_binary_propagations = 13;
     */
    numBinaryPropagations: bigint;
    /**
     * @generated from field: int64 num_integer_propagations = 14;
     */
    numIntegerPropagations: bigint;
    /**
     * @generated from field: int64 num_restarts = 24;
     */
    numRestarts: bigint;
    /**
     * @generated from field: int64 num_lp_iterations = 25;
     */
    numLpIterations: bigint;
    /**
     * The time counted from the beginning of the Solve() call.
     *
     * @generated from field: double wall_time = 15;
     */
    wallTime: number;
    /**
     * @generated from field: double user_time = 16;
     */
    userTime: number;
    /**
     * @generated from field: double deterministic_time = 17;
     */
    deterministicTime: number;
    /**
     * The integral of log(1 + absolute_objective_gap) over time.
     *
     * @generated from field: double gap_integral = 22;
     */
    gapIntegral: number;
    /**
     * Additional information about how the solution was found. It also stores
     * model or parameters errors that caused the model to be invalid.
     *
     * @generated from field: string solution_info = 20;
     */
    solutionInfo: string;
    /**
     * The solve log will be filled if the parameter log_to_response is set to
     * true.
     *
     * @generated from field: string solve_log = 26;
     */
    solveLog: string;
};
/**
 * Describes the message operations_research.sat.CpSolverResponse.
 * Use `create(CpSolverResponseSchema)` to create a new message.
 */
export declare const CpSolverResponseSchema: GenMessage<CpSolverResponse>;
/**
 * The status returned by a solver trying to solve a CpModelProto.
 *
 * @generated from enum operations_research.sat.CpSolverStatus
 */
export declare enum CpSolverStatus {
    /**
     * The status of the model is still unknown. A search limit has been reached
     * before any of the statuses below could be determined.
     *
     * @generated from enum value: UNKNOWN = 0;
     */
    UNKNOWN = 0,
    /**
     * The given CpModelProto didn't pass the validation step. You can get a
     * detailed error by calling ValidateCpModel(model_proto).
     *
     * @generated from enum value: MODEL_INVALID = 1;
     */
    MODEL_INVALID = 1,
    /**
     * A feasible solution has been found. But the search was stopped before we
     * could prove optimality or before we enumerated all solutions of a
     * feasibility problem (if asked).
     *
     * @generated from enum value: FEASIBLE = 2;
     */
    FEASIBLE = 2,
    /**
     * The problem has been proven infeasible.
     *
     * @generated from enum value: INFEASIBLE = 3;
     */
    INFEASIBLE = 3,
    /**
     * An optimal feasible solution has been found.
     *
     * More generally, this status represent a success. So we also return OPTIMAL
     * if we find a solution for a pure feasibility problem or if a gap limit has
     * been specified and we return a solution within this limit. In the case
     * where we need to return all the feasible solution, this status will only be
     * returned if we enumerated all of them; If we stopped before, we will return
     * FEASIBLE.
     *
     * @generated from enum value: OPTIMAL = 4;
     */
    OPTIMAL = 4
}
/**
 * Describes the enum operations_research.sat.CpSolverStatus.
 */
export declare const CpSolverStatusSchema: GenEnum<CpSolverStatus>;
//# sourceMappingURL=cp_model_pb.d.ts.map