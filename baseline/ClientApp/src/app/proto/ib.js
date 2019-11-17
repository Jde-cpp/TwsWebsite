/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots.ib_root || ($protobuf.roots.ib_root = {});

export const Jde = $root.Jde = (() => {

    /**
     * Namespace Jde.
     * @exports Jde
     * @namespace
     */
    const Jde = {};

    Jde.Markets = (function() {

        /**
         * Namespace Markets.
         * @memberof Jde
         * @namespace
         */
        const Markets = {};

        Markets.Proto = (function() {

            /**
             * Namespace Proto.
             * @memberof Jde.Markets
             * @namespace
             */
            const Proto = {};

            Proto.ComboLeg = (function() {

                /**
                 * Properties of a ComboLeg.
                 * @memberof Jde.Markets.Proto
                 * @interface IComboLeg
                 * @property {number|null} [ConId] ComboLeg ConId
                 * @property {number|null} [Ratio] ComboLeg Ratio
                 * @property {string|null} [Action] ComboLeg Action
                 * @property {string|null} [Exchange] ComboLeg Exchange
                 * @property {number|null} [OpenClose] ComboLeg OpenClose
                 * @property {number|null} [ShortSaleSlot] ComboLeg ShortSaleSlot
                 * @property {string|null} [DesignatedLocation] ComboLeg DesignatedLocation
                 * @property {number|null} [ExemptCode] ComboLeg ExemptCode
                 */

                /**
                 * Constructs a new ComboLeg.
                 * @memberof Jde.Markets.Proto
                 * @classdesc Represents a ComboLeg.
                 * @implements IComboLeg
                 * @constructor
                 * @param {Jde.Markets.Proto.IComboLeg=} [properties] Properties to set
                 */
                function ComboLeg(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ComboLeg ConId.
                 * @member {number} ConId
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.ConId = 0;

                /**
                 * ComboLeg Ratio.
                 * @member {number} Ratio
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.Ratio = 0;

                /**
                 * ComboLeg Action.
                 * @member {string} Action
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.Action = "";

                /**
                 * ComboLeg Exchange.
                 * @member {string} Exchange
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.Exchange = "";

                /**
                 * ComboLeg OpenClose.
                 * @member {number} OpenClose
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.OpenClose = 0;

                /**
                 * ComboLeg ShortSaleSlot.
                 * @member {number} ShortSaleSlot
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.ShortSaleSlot = 0;

                /**
                 * ComboLeg DesignatedLocation.
                 * @member {string} DesignatedLocation
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.DesignatedLocation = "";

                /**
                 * ComboLeg ExemptCode.
                 * @member {number} ExemptCode
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 */
                ComboLeg.prototype.ExemptCode = 0;

                /**
                 * Creates a new ComboLeg instance using the specified properties.
                 * @function create
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Jde.Markets.Proto.IComboLeg=} [properties] Properties to set
                 * @returns {Jde.Markets.Proto.ComboLeg} ComboLeg instance
                 */
                ComboLeg.create = function create(properties) {
                    return new ComboLeg(properties);
                };

                /**
                 * Encodes the specified ComboLeg message. Does not implicitly {@link Jde.Markets.Proto.ComboLeg.verify|verify} messages.
                 * @function encode
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Jde.Markets.Proto.IComboLeg} message ComboLeg message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ComboLeg.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.ConId != null && message.hasOwnProperty("ConId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ConId);
                    if (message.Ratio != null && message.hasOwnProperty("Ratio"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Ratio);
                    if (message.Action != null && message.hasOwnProperty("Action"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.Action);
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.Exchange);
                    if (message.OpenClose != null && message.hasOwnProperty("OpenClose"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.OpenClose);
                    if (message.ShortSaleSlot != null && message.hasOwnProperty("ShortSaleSlot"))
                        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.ShortSaleSlot);
                    if (message.DesignatedLocation != null && message.hasOwnProperty("DesignatedLocation"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.DesignatedLocation);
                    if (message.ExemptCode != null && message.hasOwnProperty("ExemptCode"))
                        writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ExemptCode);
                    return writer;
                };

                /**
                 * Encodes the specified ComboLeg message, length delimited. Does not implicitly {@link Jde.Markets.Proto.ComboLeg.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Jde.Markets.Proto.IComboLeg} message ComboLeg message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ComboLeg.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ComboLeg message from the specified reader or buffer.
                 * @function decode
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Jde.Markets.Proto.ComboLeg} ComboLeg
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ComboLeg.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.ComboLeg();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.ConId = reader.uint32();
                            break;
                        case 2:
                            message.Ratio = reader.int32();
                            break;
                        case 3:
                            message.Action = reader.string();
                            break;
                        case 4:
                            message.Exchange = reader.string();
                            break;
                        case 5:
                            message.OpenClose = reader.int32();
                            break;
                        case 6:
                            message.ShortSaleSlot = reader.int32();
                            break;
                        case 7:
                            message.DesignatedLocation = reader.string();
                            break;
                        case 8:
                            message.ExemptCode = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ComboLeg message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Jde.Markets.Proto.ComboLeg} ComboLeg
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ComboLeg.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ComboLeg message.
                 * @function verify
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ComboLeg.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.ConId != null && message.hasOwnProperty("ConId"))
                        if (!$util.isInteger(message.ConId))
                            return "ConId: integer expected";
                    if (message.Ratio != null && message.hasOwnProperty("Ratio"))
                        if (!$util.isInteger(message.Ratio))
                            return "Ratio: integer expected";
                    if (message.Action != null && message.hasOwnProperty("Action"))
                        if (!$util.isString(message.Action))
                            return "Action: string expected";
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        if (!$util.isString(message.Exchange))
                            return "Exchange: string expected";
                    if (message.OpenClose != null && message.hasOwnProperty("OpenClose"))
                        if (!$util.isInteger(message.OpenClose))
                            return "OpenClose: integer expected";
                    if (message.ShortSaleSlot != null && message.hasOwnProperty("ShortSaleSlot"))
                        if (!$util.isInteger(message.ShortSaleSlot))
                            return "ShortSaleSlot: integer expected";
                    if (message.DesignatedLocation != null && message.hasOwnProperty("DesignatedLocation"))
                        if (!$util.isString(message.DesignatedLocation))
                            return "DesignatedLocation: string expected";
                    if (message.ExemptCode != null && message.hasOwnProperty("ExemptCode"))
                        if (!$util.isInteger(message.ExemptCode))
                            return "ExemptCode: integer expected";
                    return null;
                };

                /**
                 * Creates a ComboLeg message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Jde.Markets.Proto.ComboLeg} ComboLeg
                 */
                ComboLeg.fromObject = function fromObject(object) {
                    if (object instanceof $root.Jde.Markets.Proto.ComboLeg)
                        return object;
                    let message = new $root.Jde.Markets.Proto.ComboLeg();
                    if (object.ConId != null)
                        message.ConId = object.ConId >>> 0;
                    if (object.Ratio != null)
                        message.Ratio = object.Ratio | 0;
                    if (object.Action != null)
                        message.Action = String(object.Action);
                    if (object.Exchange != null)
                        message.Exchange = String(object.Exchange);
                    if (object.OpenClose != null)
                        message.OpenClose = object.OpenClose | 0;
                    if (object.ShortSaleSlot != null)
                        message.ShortSaleSlot = object.ShortSaleSlot | 0;
                    if (object.DesignatedLocation != null)
                        message.DesignatedLocation = String(object.DesignatedLocation);
                    if (object.ExemptCode != null)
                        message.ExemptCode = object.ExemptCode | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ComboLeg message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @static
                 * @param {Jde.Markets.Proto.ComboLeg} message ComboLeg
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ComboLeg.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.ConId = 0;
                        object.Ratio = 0;
                        object.Action = "";
                        object.Exchange = "";
                        object.OpenClose = 0;
                        object.ShortSaleSlot = 0;
                        object.DesignatedLocation = "";
                        object.ExemptCode = 0;
                    }
                    if (message.ConId != null && message.hasOwnProperty("ConId"))
                        object.ConId = message.ConId;
                    if (message.Ratio != null && message.hasOwnProperty("Ratio"))
                        object.Ratio = message.Ratio;
                    if (message.Action != null && message.hasOwnProperty("Action"))
                        object.Action = message.Action;
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        object.Exchange = message.Exchange;
                    if (message.OpenClose != null && message.hasOwnProperty("OpenClose"))
                        object.OpenClose = message.OpenClose;
                    if (message.ShortSaleSlot != null && message.hasOwnProperty("ShortSaleSlot"))
                        object.ShortSaleSlot = message.ShortSaleSlot;
                    if (message.DesignatedLocation != null && message.hasOwnProperty("DesignatedLocation"))
                        object.DesignatedLocation = message.DesignatedLocation;
                    if (message.ExemptCode != null && message.hasOwnProperty("ExemptCode"))
                        object.ExemptCode = message.ExemptCode;
                    return object;
                };

                /**
                 * Converts this ComboLeg to JSON.
                 * @function toJSON
                 * @memberof Jde.Markets.Proto.ComboLeg
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ComboLeg.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ComboLeg;
            })();

            Proto.DeltaNeutralContract = (function() {

                /**
                 * Properties of a DeltaNeutralContract.
                 * @memberof Jde.Markets.Proto
                 * @interface IDeltaNeutralContract
                 * @property {number|null} [Id] DeltaNeutralContract Id
                 * @property {number|null} [Delta] DeltaNeutralContract Delta
                 * @property {number|null} [Price] DeltaNeutralContract Price
                 */

                /**
                 * Constructs a new DeltaNeutralContract.
                 * @memberof Jde.Markets.Proto
                 * @classdesc Represents a DeltaNeutralContract.
                 * @implements IDeltaNeutralContract
                 * @constructor
                 * @param {Jde.Markets.Proto.IDeltaNeutralContract=} [properties] Properties to set
                 */
                function DeltaNeutralContract(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeltaNeutralContract Id.
                 * @member {number} Id
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @instance
                 */
                DeltaNeutralContract.prototype.Id = 0;

                /**
                 * DeltaNeutralContract Delta.
                 * @member {number} Delta
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @instance
                 */
                DeltaNeutralContract.prototype.Delta = 0;

                /**
                 * DeltaNeutralContract Price.
                 * @member {number} Price
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @instance
                 */
                DeltaNeutralContract.prototype.Price = 0;

                /**
                 * Creates a new DeltaNeutralContract instance using the specified properties.
                 * @function create
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Jde.Markets.Proto.IDeltaNeutralContract=} [properties] Properties to set
                 * @returns {Jde.Markets.Proto.DeltaNeutralContract} DeltaNeutralContract instance
                 */
                DeltaNeutralContract.create = function create(properties) {
                    return new DeltaNeutralContract(properties);
                };

                /**
                 * Encodes the specified DeltaNeutralContract message. Does not implicitly {@link Jde.Markets.Proto.DeltaNeutralContract.verify|verify} messages.
                 * @function encode
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Jde.Markets.Proto.IDeltaNeutralContract} message DeltaNeutralContract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeltaNeutralContract.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Id);
                    if (message.Delta != null && message.hasOwnProperty("Delta"))
                        writer.uint32(/* id 2, wireType 1 =*/17).double(message.Delta);
                    if (message.Price != null && message.hasOwnProperty("Price"))
                        writer.uint32(/* id 3, wireType 1 =*/25).double(message.Price);
                    return writer;
                };

                /**
                 * Encodes the specified DeltaNeutralContract message, length delimited. Does not implicitly {@link Jde.Markets.Proto.DeltaNeutralContract.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Jde.Markets.Proto.IDeltaNeutralContract} message DeltaNeutralContract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeltaNeutralContract.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeltaNeutralContract message from the specified reader or buffer.
                 * @function decode
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Jde.Markets.Proto.DeltaNeutralContract} DeltaNeutralContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeltaNeutralContract.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.DeltaNeutralContract();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.Id = reader.int32();
                            break;
                        case 2:
                            message.Delta = reader.double();
                            break;
                        case 3:
                            message.Price = reader.double();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeltaNeutralContract message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Jde.Markets.Proto.DeltaNeutralContract} DeltaNeutralContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeltaNeutralContract.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeltaNeutralContract message.
                 * @function verify
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeltaNeutralContract.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        if (!$util.isInteger(message.Id))
                            return "Id: integer expected";
                    if (message.Delta != null && message.hasOwnProperty("Delta"))
                        if (typeof message.Delta !== "number")
                            return "Delta: number expected";
                    if (message.Price != null && message.hasOwnProperty("Price"))
                        if (typeof message.Price !== "number")
                            return "Price: number expected";
                    return null;
                };

                /**
                 * Creates a DeltaNeutralContract message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Jde.Markets.Proto.DeltaNeutralContract} DeltaNeutralContract
                 */
                DeltaNeutralContract.fromObject = function fromObject(object) {
                    if (object instanceof $root.Jde.Markets.Proto.DeltaNeutralContract)
                        return object;
                    let message = new $root.Jde.Markets.Proto.DeltaNeutralContract();
                    if (object.Id != null)
                        message.Id = object.Id | 0;
                    if (object.Delta != null)
                        message.Delta = Number(object.Delta);
                    if (object.Price != null)
                        message.Price = Number(object.Price);
                    return message;
                };

                /**
                 * Creates a plain object from a DeltaNeutralContract message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @static
                 * @param {Jde.Markets.Proto.DeltaNeutralContract} message DeltaNeutralContract
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeltaNeutralContract.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.Id = 0;
                        object.Delta = 0;
                        object.Price = 0;
                    }
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        object.Id = message.Id;
                    if (message.Delta != null && message.hasOwnProperty("Delta"))
                        object.Delta = options.json && !isFinite(message.Delta) ? String(message.Delta) : message.Delta;
                    if (message.Price != null && message.hasOwnProperty("Price"))
                        object.Price = options.json && !isFinite(message.Price) ? String(message.Price) : message.Price;
                    return object;
                };

                /**
                 * Converts this DeltaNeutralContract to JSON.
                 * @function toJSON
                 * @memberof Jde.Markets.Proto.DeltaNeutralContract
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeltaNeutralContract.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return DeltaNeutralContract;
            })();

            Proto.Contract = (function() {

                /**
                 * Properties of a Contract.
                 * @memberof Jde.Markets.Proto
                 * @interface IContract
                 * @property {number|null} [Id] Contract Id
                 * @property {string|null} [Symbol] Contract Symbol
                 * @property {string|null} [SecType] Contract SecType
                 * @property {string|null} [LastTradeDateOrContractMonth] Contract LastTradeDateOrContractMonth
                 * @property {number|null} [Strike] Contract Strike
                 * @property {string|null} [Right] Contract Right
                 * @property {string|null} [Multiplier] Contract Multiplier
                 * @property {string|null} [Exchange] Contract Exchange
                 * @property {string|null} [PrimaryExchange] Contract PrimaryExchange
                 * @property {string|null} [Currency] Contract Currency
                 * @property {string|null} [LocalSymbol] Contract LocalSymbol
                 * @property {string|null} [TradingClass] Contract TradingClass
                 * @property {boolean|null} [IncludeExpired] Contract IncludeExpired
                 * @property {string|null} [SecIdType] Contract SecIdType
                 * @property {string|null} [SecId] Contract SecId
                 * @property {string|null} [ComboLegsDescrip] Contract ComboLegsDescrip
                 * @property {Array.<Jde.Markets.Proto.IComboLeg>|null} [ComboLegs] Contract ComboLegs
                 * @property {Jde.Markets.Proto.IDeltaNeutralContract|null} [DeltaNeutral] Contract DeltaNeutral
                 * @property {string|null} [Name] Contract Name
                 * @property {number|null} [Flags] Contract Flags
                 */

                /**
                 * Constructs a new Contract.
                 * @memberof Jde.Markets.Proto
                 * @classdesc Represents a Contract.
                 * @implements IContract
                 * @constructor
                 * @param {Jde.Markets.Proto.IContract=} [properties] Properties to set
                 */
                function Contract(properties) {
                    this.ComboLegs = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Contract Id.
                 * @member {number} Id
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Id = 0;

                /**
                 * Contract Symbol.
                 * @member {string} Symbol
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Symbol = "";

                /**
                 * Contract SecType.
                 * @member {string} SecType
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.SecType = "";

                /**
                 * Contract LastTradeDateOrContractMonth.
                 * @member {string} LastTradeDateOrContractMonth
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.LastTradeDateOrContractMonth = "";

                /**
                 * Contract Strike.
                 * @member {number} Strike
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Strike = 0;

                /**
                 * Contract Right.
                 * @member {string} Right
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Right = "";

                /**
                 * Contract Multiplier.
                 * @member {string} Multiplier
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Multiplier = "";

                /**
                 * Contract Exchange.
                 * @member {string} Exchange
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Exchange = "";

                /**
                 * Contract PrimaryExchange.
                 * @member {string} PrimaryExchange
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.PrimaryExchange = "";

                /**
                 * Contract Currency.
                 * @member {string} Currency
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Currency = "";

                /**
                 * Contract LocalSymbol.
                 * @member {string} LocalSymbol
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.LocalSymbol = "";

                /**
                 * Contract TradingClass.
                 * @member {string} TradingClass
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.TradingClass = "";

                /**
                 * Contract IncludeExpired.
                 * @member {boolean} IncludeExpired
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.IncludeExpired = false;

                /**
                 * Contract SecIdType.
                 * @member {string} SecIdType
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.SecIdType = "";

                /**
                 * Contract SecId.
                 * @member {string} SecId
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.SecId = "";

                /**
                 * Contract ComboLegsDescrip.
                 * @member {string} ComboLegsDescrip
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.ComboLegsDescrip = "";

                /**
                 * Contract ComboLegs.
                 * @member {Array.<Jde.Markets.Proto.IComboLeg>} ComboLegs
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.ComboLegs = $util.emptyArray;

                /**
                 * Contract DeltaNeutral.
                 * @member {Jde.Markets.Proto.IDeltaNeutralContract|null|undefined} DeltaNeutral
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.DeltaNeutral = null;

                /**
                 * Contract Name.
                 * @member {string} Name
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Name = "";

                /**
                 * Contract Flags.
                 * @member {number} Flags
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 */
                Contract.prototype.Flags = 0;

                /**
                 * Creates a new Contract instance using the specified properties.
                 * @function create
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Jde.Markets.Proto.IContract=} [properties] Properties to set
                 * @returns {Jde.Markets.Proto.Contract} Contract instance
                 */
                Contract.create = function create(properties) {
                    return new Contract(properties);
                };

                /**
                 * Encodes the specified Contract message. Does not implicitly {@link Jde.Markets.Proto.Contract.verify|verify} messages.
                 * @function encode
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Jde.Markets.Proto.IContract} message Contract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Contract.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Id);
                    if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.Symbol);
                    if (message.SecType != null && message.hasOwnProperty("SecType"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.SecType);
                    if (message.LastTradeDateOrContractMonth != null && message.hasOwnProperty("LastTradeDateOrContractMonth"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.LastTradeDateOrContractMonth);
                    if (message.Strike != null && message.hasOwnProperty("Strike"))
                        writer.uint32(/* id 5, wireType 1 =*/41).double(message.Strike);
                    if (message.Right != null && message.hasOwnProperty("Right"))
                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.Right);
                    if (message.Multiplier != null && message.hasOwnProperty("Multiplier"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.Multiplier);
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        writer.uint32(/* id 8, wireType 2 =*/66).string(message.Exchange);
                    if (message.PrimaryExchange != null && message.hasOwnProperty("PrimaryExchange"))
                        writer.uint32(/* id 9, wireType 2 =*/74).string(message.PrimaryExchange);
                    if (message.Currency != null && message.hasOwnProperty("Currency"))
                        writer.uint32(/* id 10, wireType 2 =*/82).string(message.Currency);
                    if (message.LocalSymbol != null && message.hasOwnProperty("LocalSymbol"))
                        writer.uint32(/* id 11, wireType 2 =*/90).string(message.LocalSymbol);
                    if (message.TradingClass != null && message.hasOwnProperty("TradingClass"))
                        writer.uint32(/* id 12, wireType 2 =*/98).string(message.TradingClass);
                    if (message.IncludeExpired != null && message.hasOwnProperty("IncludeExpired"))
                        writer.uint32(/* id 13, wireType 0 =*/104).bool(message.IncludeExpired);
                    if (message.SecIdType != null && message.hasOwnProperty("SecIdType"))
                        writer.uint32(/* id 14, wireType 2 =*/114).string(message.SecIdType);
                    if (message.SecId != null && message.hasOwnProperty("SecId"))
                        writer.uint32(/* id 15, wireType 2 =*/122).string(message.SecId);
                    if (message.ComboLegsDescrip != null && message.hasOwnProperty("ComboLegsDescrip"))
                        writer.uint32(/* id 16, wireType 2 =*/130).string(message.ComboLegsDescrip);
                    if (message.ComboLegs != null && message.ComboLegs.length)
                        for (let i = 0; i < message.ComboLegs.length; ++i)
                            $root.Jde.Markets.Proto.ComboLeg.encode(message.ComboLegs[i], writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
                    if (message.DeltaNeutral != null && message.hasOwnProperty("DeltaNeutral"))
                        $root.Jde.Markets.Proto.DeltaNeutralContract.encode(message.DeltaNeutral, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
                    if (message.Name != null && message.hasOwnProperty("Name"))
                        writer.uint32(/* id 19, wireType 2 =*/154).string(message.Name);
                    if (message.Flags != null && message.hasOwnProperty("Flags"))
                        writer.uint32(/* id 20, wireType 0 =*/160).uint32(message.Flags);
                    return writer;
                };

                /**
                 * Encodes the specified Contract message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Contract.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Jde.Markets.Proto.IContract} message Contract message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Contract.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Contract message from the specified reader or buffer.
                 * @function decode
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {Jde.Markets.Proto.Contract} Contract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Contract.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.Markets.Proto.Contract();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.Id = reader.uint32();
                            break;
                        case 2:
                            message.Symbol = reader.string();
                            break;
                        case 3:
                            message.SecType = reader.string();
                            break;
                        case 4:
                            message.LastTradeDateOrContractMonth = reader.string();
                            break;
                        case 5:
                            message.Strike = reader.double();
                            break;
                        case 6:
                            message.Right = reader.string();
                            break;
                        case 7:
                            message.Multiplier = reader.string();
                            break;
                        case 8:
                            message.Exchange = reader.string();
                            break;
                        case 9:
                            message.PrimaryExchange = reader.string();
                            break;
                        case 10:
                            message.Currency = reader.string();
                            break;
                        case 11:
                            message.LocalSymbol = reader.string();
                            break;
                        case 12:
                            message.TradingClass = reader.string();
                            break;
                        case 13:
                            message.IncludeExpired = reader.bool();
                            break;
                        case 14:
                            message.SecIdType = reader.string();
                            break;
                        case 15:
                            message.SecId = reader.string();
                            break;
                        case 16:
                            message.ComboLegsDescrip = reader.string();
                            break;
                        case 17:
                            if (!(message.ComboLegs && message.ComboLegs.length))
                                message.ComboLegs = [];
                            message.ComboLegs.push($root.Jde.Markets.Proto.ComboLeg.decode(reader, reader.uint32()));
                            break;
                        case 18:
                            message.DeltaNeutral = $root.Jde.Markets.Proto.DeltaNeutralContract.decode(reader, reader.uint32());
                            break;
                        case 19:
                            message.Name = reader.string();
                            break;
                        case 20:
                            message.Flags = reader.uint32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Contract message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {Jde.Markets.Proto.Contract} Contract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Contract.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Contract message.
                 * @function verify
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Contract.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        if (!$util.isInteger(message.Id))
                            return "Id: integer expected";
                    if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                        if (!$util.isString(message.Symbol))
                            return "Symbol: string expected";
                    if (message.SecType != null && message.hasOwnProperty("SecType"))
                        if (!$util.isString(message.SecType))
                            return "SecType: string expected";
                    if (message.LastTradeDateOrContractMonth != null && message.hasOwnProperty("LastTradeDateOrContractMonth"))
                        if (!$util.isString(message.LastTradeDateOrContractMonth))
                            return "LastTradeDateOrContractMonth: string expected";
                    if (message.Strike != null && message.hasOwnProperty("Strike"))
                        if (typeof message.Strike !== "number")
                            return "Strike: number expected";
                    if (message.Right != null && message.hasOwnProperty("Right"))
                        if (!$util.isString(message.Right))
                            return "Right: string expected";
                    if (message.Multiplier != null && message.hasOwnProperty("Multiplier"))
                        if (!$util.isString(message.Multiplier))
                            return "Multiplier: string expected";
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        if (!$util.isString(message.Exchange))
                            return "Exchange: string expected";
                    if (message.PrimaryExchange != null && message.hasOwnProperty("PrimaryExchange"))
                        if (!$util.isString(message.PrimaryExchange))
                            return "PrimaryExchange: string expected";
                    if (message.Currency != null && message.hasOwnProperty("Currency"))
                        if (!$util.isString(message.Currency))
                            return "Currency: string expected";
                    if (message.LocalSymbol != null && message.hasOwnProperty("LocalSymbol"))
                        if (!$util.isString(message.LocalSymbol))
                            return "LocalSymbol: string expected";
                    if (message.TradingClass != null && message.hasOwnProperty("TradingClass"))
                        if (!$util.isString(message.TradingClass))
                            return "TradingClass: string expected";
                    if (message.IncludeExpired != null && message.hasOwnProperty("IncludeExpired"))
                        if (typeof message.IncludeExpired !== "boolean")
                            return "IncludeExpired: boolean expected";
                    if (message.SecIdType != null && message.hasOwnProperty("SecIdType"))
                        if (!$util.isString(message.SecIdType))
                            return "SecIdType: string expected";
                    if (message.SecId != null && message.hasOwnProperty("SecId"))
                        if (!$util.isString(message.SecId))
                            return "SecId: string expected";
                    if (message.ComboLegsDescrip != null && message.hasOwnProperty("ComboLegsDescrip"))
                        if (!$util.isString(message.ComboLegsDescrip))
                            return "ComboLegsDescrip: string expected";
                    if (message.ComboLegs != null && message.hasOwnProperty("ComboLegs")) {
                        if (!Array.isArray(message.ComboLegs))
                            return "ComboLegs: array expected";
                        for (let i = 0; i < message.ComboLegs.length; ++i) {
                            let error = $root.Jde.Markets.Proto.ComboLeg.verify(message.ComboLegs[i]);
                            if (error)
                                return "ComboLegs." + error;
                        }
                    }
                    if (message.DeltaNeutral != null && message.hasOwnProperty("DeltaNeutral")) {
                        let error = $root.Jde.Markets.Proto.DeltaNeutralContract.verify(message.DeltaNeutral);
                        if (error)
                            return "DeltaNeutral." + error;
                    }
                    if (message.Name != null && message.hasOwnProperty("Name"))
                        if (!$util.isString(message.Name))
                            return "Name: string expected";
                    if (message.Flags != null && message.hasOwnProperty("Flags"))
                        if (!$util.isInteger(message.Flags))
                            return "Flags: integer expected";
                    return null;
                };

                /**
                 * Creates a Contract message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {Jde.Markets.Proto.Contract} Contract
                 */
                Contract.fromObject = function fromObject(object) {
                    if (object instanceof $root.Jde.Markets.Proto.Contract)
                        return object;
                    let message = new $root.Jde.Markets.Proto.Contract();
                    if (object.Id != null)
                        message.Id = object.Id >>> 0;
                    if (object.Symbol != null)
                        message.Symbol = String(object.Symbol);
                    if (object.SecType != null)
                        message.SecType = String(object.SecType);
                    if (object.LastTradeDateOrContractMonth != null)
                        message.LastTradeDateOrContractMonth = String(object.LastTradeDateOrContractMonth);
                    if (object.Strike != null)
                        message.Strike = Number(object.Strike);
                    if (object.Right != null)
                        message.Right = String(object.Right);
                    if (object.Multiplier != null)
                        message.Multiplier = String(object.Multiplier);
                    if (object.Exchange != null)
                        message.Exchange = String(object.Exchange);
                    if (object.PrimaryExchange != null)
                        message.PrimaryExchange = String(object.PrimaryExchange);
                    if (object.Currency != null)
                        message.Currency = String(object.Currency);
                    if (object.LocalSymbol != null)
                        message.LocalSymbol = String(object.LocalSymbol);
                    if (object.TradingClass != null)
                        message.TradingClass = String(object.TradingClass);
                    if (object.IncludeExpired != null)
                        message.IncludeExpired = Boolean(object.IncludeExpired);
                    if (object.SecIdType != null)
                        message.SecIdType = String(object.SecIdType);
                    if (object.SecId != null)
                        message.SecId = String(object.SecId);
                    if (object.ComboLegsDescrip != null)
                        message.ComboLegsDescrip = String(object.ComboLegsDescrip);
                    if (object.ComboLegs) {
                        if (!Array.isArray(object.ComboLegs))
                            throw TypeError(".Jde.Markets.Proto.Contract.ComboLegs: array expected");
                        message.ComboLegs = [];
                        for (let i = 0; i < object.ComboLegs.length; ++i) {
                            if (typeof object.ComboLegs[i] !== "object")
                                throw TypeError(".Jde.Markets.Proto.Contract.ComboLegs: object expected");
                            message.ComboLegs[i] = $root.Jde.Markets.Proto.ComboLeg.fromObject(object.ComboLegs[i]);
                        }
                    }
                    if (object.DeltaNeutral != null) {
                        if (typeof object.DeltaNeutral !== "object")
                            throw TypeError(".Jde.Markets.Proto.Contract.DeltaNeutral: object expected");
                        message.DeltaNeutral = $root.Jde.Markets.Proto.DeltaNeutralContract.fromObject(object.DeltaNeutral);
                    }
                    if (object.Name != null)
                        message.Name = String(object.Name);
                    if (object.Flags != null)
                        message.Flags = object.Flags >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Contract message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof Jde.Markets.Proto.Contract
                 * @static
                 * @param {Jde.Markets.Proto.Contract} message Contract
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Contract.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.ComboLegs = [];
                    if (options.defaults) {
                        object.Id = 0;
                        object.Symbol = "";
                        object.SecType = "";
                        object.LastTradeDateOrContractMonth = "";
                        object.Strike = 0;
                        object.Right = "";
                        object.Multiplier = "";
                        object.Exchange = "";
                        object.PrimaryExchange = "";
                        object.Currency = "";
                        object.LocalSymbol = "";
                        object.TradingClass = "";
                        object.IncludeExpired = false;
                        object.SecIdType = "";
                        object.SecId = "";
                        object.ComboLegsDescrip = "";
                        object.DeltaNeutral = null;
                        object.Name = "";
                        object.Flags = 0;
                    }
                    if (message.Id != null && message.hasOwnProperty("Id"))
                        object.Id = message.Id;
                    if (message.Symbol != null && message.hasOwnProperty("Symbol"))
                        object.Symbol = message.Symbol;
                    if (message.SecType != null && message.hasOwnProperty("SecType"))
                        object.SecType = message.SecType;
                    if (message.LastTradeDateOrContractMonth != null && message.hasOwnProperty("LastTradeDateOrContractMonth"))
                        object.LastTradeDateOrContractMonth = message.LastTradeDateOrContractMonth;
                    if (message.Strike != null && message.hasOwnProperty("Strike"))
                        object.Strike = options.json && !isFinite(message.Strike) ? String(message.Strike) : message.Strike;
                    if (message.Right != null && message.hasOwnProperty("Right"))
                        object.Right = message.Right;
                    if (message.Multiplier != null && message.hasOwnProperty("Multiplier"))
                        object.Multiplier = message.Multiplier;
                    if (message.Exchange != null && message.hasOwnProperty("Exchange"))
                        object.Exchange = message.Exchange;
                    if (message.PrimaryExchange != null && message.hasOwnProperty("PrimaryExchange"))
                        object.PrimaryExchange = message.PrimaryExchange;
                    if (message.Currency != null && message.hasOwnProperty("Currency"))
                        object.Currency = message.Currency;
                    if (message.LocalSymbol != null && message.hasOwnProperty("LocalSymbol"))
                        object.LocalSymbol = message.LocalSymbol;
                    if (message.TradingClass != null && message.hasOwnProperty("TradingClass"))
                        object.TradingClass = message.TradingClass;
                    if (message.IncludeExpired != null && message.hasOwnProperty("IncludeExpired"))
                        object.IncludeExpired = message.IncludeExpired;
                    if (message.SecIdType != null && message.hasOwnProperty("SecIdType"))
                        object.SecIdType = message.SecIdType;
                    if (message.SecId != null && message.hasOwnProperty("SecId"))
                        object.SecId = message.SecId;
                    if (message.ComboLegsDescrip != null && message.hasOwnProperty("ComboLegsDescrip"))
                        object.ComboLegsDescrip = message.ComboLegsDescrip;
                    if (message.ComboLegs && message.ComboLegs.length) {
                        object.ComboLegs = [];
                        for (let j = 0; j < message.ComboLegs.length; ++j)
                            object.ComboLegs[j] = $root.Jde.Markets.Proto.ComboLeg.toObject(message.ComboLegs[j], options);
                    }
                    if (message.DeltaNeutral != null && message.hasOwnProperty("DeltaNeutral"))
                        object.DeltaNeutral = $root.Jde.Markets.Proto.DeltaNeutralContract.toObject(message.DeltaNeutral, options);
                    if (message.Name != null && message.hasOwnProperty("Name"))
                        object.Name = message.Name;
                    if (message.Flags != null && message.hasOwnProperty("Flags"))
                        object.Flags = message.Flags;
                    return object;
                };

                /**
                 * Converts this Contract to JSON.
                 * @function toJSON
                 * @memberof Jde.Markets.Proto.Contract
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Contract.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Contract;
            })();

            return Proto;
        })();

        return Markets;
    })();

    return Jde;
})();

export { $root as default };
