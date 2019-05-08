
import { MeditationModel } from "./Meditation";

export class MeditationsDataModel {
    
    private _meditations: Array<MeditationModel>;
    private _version: number;
    private _minversion: number;

    /**
     * Getter meditations
     * @return {Array<MeditationModel>}
     */
	public get meditations(): Array<MeditationModel> {
		return this._meditations;
	}

    /**
     * Getter version
     * @return {number}
     */
	public get version(): number {
		return this._version;
	}

    /**
     * Getter minversion
     * @return {number}
     */
	public get minversion(): number {
		return this._minversion;
	}

    /**
     * Setter meditations
     * @param {Array<MeditationModel>} value
     */
	public set meditations(value: Array<MeditationModel>) {
		this._meditations = value;
	}

    /**
     * Setter version
     * @param {number} value
     */
	public set version(value: number) {
		this._version = value;
	}

    /**
     * Setter minversion
     * @param {number} value
     */
	public set minversion(value: number) {
		this._minversion = value;
	}
    
}