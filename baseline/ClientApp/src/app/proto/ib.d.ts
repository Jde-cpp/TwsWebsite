import * as $protobuf from "protobufjs";
/** Namespace Jde. */
export namespace Jde {

    /** Namespace Markets. */
    namespace Markets {

        /** Namespace Proto. */
        namespace Proto {

            /** Properties of a ComboLeg. */
            interface IComboLeg {

                /** ComboLeg ConId */
                ConId?: (number|null);

                /** ComboLeg Ratio */
                Ratio?: (number|null);

                /** ComboLeg Action */
                Action?: (string|null);

                /** ComboLeg Exchange */
                Exchange?: (string|null);

                /** ComboLeg OpenClose */
                OpenClose?: (number|null);

                /** ComboLeg ShortSaleSlot */
                ShortSaleSlot?: (number|null);

                /** ComboLeg DesignatedLocation */
                DesignatedLocation?: (string|null);

                /** ComboLeg ExemptCode */
                ExemptCode?: (number|null);
            }

            /** Represents a ComboLeg. */
            class ComboLeg implements IComboLeg {

                /**
                 * Constructs a new ComboLeg.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: Jde.Markets.Proto.IComboLeg);

                /** ComboLeg ConId. */
                public ConId: number;

                /** ComboLeg Ratio. */
                public Ratio: number;

                /** ComboLeg Action. */
                public Action: string;

                /** ComboLeg Exchange. */
                public Exchange: string;

                /** ComboLeg OpenClose. */
                public OpenClose: number;

                /** ComboLeg ShortSaleSlot. */
                public ShortSaleSlot: number;

                /** ComboLeg DesignatedLocation. */
                public DesignatedLocation: string;

                /** ComboLeg ExemptCode. */
                public ExemptCode: number;

                /**
                 * Creates a new ComboLeg instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ComboLeg instance
                 */
                public static create(properties?: Jde.Markets.Proto.IComboLeg): Jde.Markets.Proto.ComboLeg;

                /**
                 * Encodes the specified ComboLeg message. Does not implicitly {@link Jde.Markets.Proto.ComboLeg.verify|verify} messages.
                 * @param message ComboLeg message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: Jde.Markets.Proto.IComboLeg, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ComboLeg message, length delimited. Does not implicitly {@link Jde.Markets.Proto.ComboLeg.verify|verify} messages.
                 * @param message ComboLeg message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: Jde.Markets.Proto.IComboLeg, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ComboLeg message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ComboLeg
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.ComboLeg;

                /**
                 * Decodes a ComboLeg message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ComboLeg
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.ComboLeg;

                /**
                 * Verifies a ComboLeg message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ComboLeg message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ComboLeg
                 */
                public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.ComboLeg;

                /**
                 * Creates a plain object from a ComboLeg message. Also converts values to other types if specified.
                 * @param message ComboLeg
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: Jde.Markets.Proto.ComboLeg, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ComboLeg to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DeltaNeutralContract. */
            interface IDeltaNeutralContract {

                /** DeltaNeutralContract Id */
                Id?: (number|null);

                /** DeltaNeutralContract Delta */
                Delta?: (number|null);

                /** DeltaNeutralContract Price */
                Price?: (number|null);
            }

            /** Represents a DeltaNeutralContract. */
            class DeltaNeutralContract implements IDeltaNeutralContract {

                /**
                 * Constructs a new DeltaNeutralContract.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: Jde.Markets.Proto.IDeltaNeutralContract);

                /** DeltaNeutralContract Id. */
                public Id: number;

                /** DeltaNeutralContract Delta. */
                public Delta: number;

                /** DeltaNeutralContract Price. */
                public Price: number;

                /**
                 * Creates a new DeltaNeutralContract instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeltaNeutralContract instance
                 */
                public static create(properties?: Jde.Markets.Proto.IDeltaNeutralContract): Jde.Markets.Proto.DeltaNeutralContract;

                /**
                 * Encodes the specified DeltaNeutralContract message. Does not implicitly {@link Jde.Markets.Proto.DeltaNeutralContract.verify|verify} messages.
                 * @param message DeltaNeutralContract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: Jde.Markets.Proto.IDeltaNeutralContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeltaNeutralContract message, length delimited. Does not implicitly {@link Jde.Markets.Proto.DeltaNeutralContract.verify|verify} messages.
                 * @param message DeltaNeutralContract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: Jde.Markets.Proto.IDeltaNeutralContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeltaNeutralContract message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeltaNeutralContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.DeltaNeutralContract;

                /**
                 * Decodes a DeltaNeutralContract message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeltaNeutralContract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.DeltaNeutralContract;

                /**
                 * Verifies a DeltaNeutralContract message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeltaNeutralContract message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeltaNeutralContract
                 */
                public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.DeltaNeutralContract;

                /**
                 * Creates a plain object from a DeltaNeutralContract message. Also converts values to other types if specified.
                 * @param message DeltaNeutralContract
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: Jde.Markets.Proto.DeltaNeutralContract, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeltaNeutralContract to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Contract. */
            interface IContract {

                /** Contract Id */
                Id?: (number|null);

                /** Contract Symbol */
                Symbol?: (string|null);

                /** Contract SecType */
                SecType?: (string|null);

                /** Contract LastTradeDateOrContractMonth */
                LastTradeDateOrContractMonth?: (string|null);

                /** Contract Strike */
                Strike?: (number|null);

                /** Contract Right */
                Right?: (string|null);

                /** Contract Multiplier */
                Multiplier?: (string|null);

                /** Contract Exchange */
                Exchange?: (string|null);

                /** Contract PrimaryExchange */
                PrimaryExchange?: (string|null);

                /** Contract Currency */
                Currency?: (string|null);

                /** Contract LocalSymbol */
                LocalSymbol?: (string|null);

                /** Contract TradingClass */
                TradingClass?: (string|null);

                /** Contract IncludeExpired */
                IncludeExpired?: (boolean|null);

                /** Contract SecIdType */
                SecIdType?: (string|null);

                /** Contract SecId */
                SecId?: (string|null);

                /** Contract ComboLegsDescrip */
                ComboLegsDescrip?: (string|null);

                /** Contract ComboLegs */
                ComboLegs?: (Jde.Markets.Proto.IComboLeg[]|null);

                /** Contract DeltaNeutral */
                DeltaNeutral?: (Jde.Markets.Proto.IDeltaNeutralContract|null);

                /** Contract Name */
                Name?: (string|null);

                /** Contract Flags */
                Flags?: (number|null);
            }

            /** Represents a Contract. */
            class Contract implements IContract {

                /**
                 * Constructs a new Contract.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: Jde.Markets.Proto.IContract);

                /** Contract Id. */
                public Id: number;

                /** Contract Symbol. */
                public Symbol: string;

                /** Contract SecType. */
                public SecType: string;

                /** Contract LastTradeDateOrContractMonth. */
                public LastTradeDateOrContractMonth: string;

                /** Contract Strike. */
                public Strike: number;

                /** Contract Right. */
                public Right: string;

                /** Contract Multiplier. */
                public Multiplier: string;

                /** Contract Exchange. */
                public Exchange: string;

                /** Contract PrimaryExchange. */
                public PrimaryExchange: string;

                /** Contract Currency. */
                public Currency: string;

                /** Contract LocalSymbol. */
                public LocalSymbol: string;

                /** Contract TradingClass. */
                public TradingClass: string;

                /** Contract IncludeExpired. */
                public IncludeExpired: boolean;

                /** Contract SecIdType. */
                public SecIdType: string;

                /** Contract SecId. */
                public SecId: string;

                /** Contract ComboLegsDescrip. */
                public ComboLegsDescrip: string;

                /** Contract ComboLegs. */
                public ComboLegs: Jde.Markets.Proto.IComboLeg[];

                /** Contract DeltaNeutral. */
                public DeltaNeutral?: (Jde.Markets.Proto.IDeltaNeutralContract|null);

                /** Contract Name. */
                public Name: string;

                /** Contract Flags. */
                public Flags: number;

                /**
                 * Creates a new Contract instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Contract instance
                 */
                public static create(properties?: Jde.Markets.Proto.IContract): Jde.Markets.Proto.Contract;

                /**
                 * Encodes the specified Contract message. Does not implicitly {@link Jde.Markets.Proto.Contract.verify|verify} messages.
                 * @param message Contract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: Jde.Markets.Proto.IContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Contract message, length delimited. Does not implicitly {@link Jde.Markets.Proto.Contract.verify|verify} messages.
                 * @param message Contract message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: Jde.Markets.Proto.IContract, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Contract message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Contract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.Markets.Proto.Contract;

                /**
                 * Decodes a Contract message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Contract
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.Markets.Proto.Contract;

                /**
                 * Verifies a Contract message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Contract message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Contract
                 */
                public static fromObject(object: { [k: string]: any }): Jde.Markets.Proto.Contract;

                /**
                 * Creates a plain object from a Contract message. Also converts values to other types if specified.
                 * @param message Contract
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: Jde.Markets.Proto.Contract, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Contract to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
