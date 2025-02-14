// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { SectionFullWidthThreshold, SideMenuStickyThreshold } from 'consts';
import { useBalances } from 'contexts/Balances';
import { useConnect } from 'contexts/Connect';
import { useModal } from 'contexts/Modal';
import { useStaking } from 'contexts/Staking';
import { useUi } from 'contexts/UI';
import { Button } from 'library/Button';
import { GenerateNominations } from 'library/GenerateNominations';
import { CardHeaderWrapper, CardWrapper } from 'library/Graphs/Wrappers';
import { OpenHelpIcon } from 'library/OpenHelpIcon';
import { PageTitle } from 'library/PageTitle';
import { StatBoxList } from 'library/StatBoxList';
import {
  PageRowWrapper,
  RowPrimaryWrapper,
  RowSecondaryWrapper,
} from 'Wrappers';
import { ControllerNotImported } from './ControllerNotImported';
import { ManageBond } from './ManageBond';
import { Nominations } from './Nominations';
import ActiveNominationsStatBox from './Stats/ActiveNominations';
import InacctiveNominationsStatBox from './Stats/InactiveNominations';
import MinimumActiveBondStatBox from './Stats/MinimumActiveBond';
import { Status } from './Status';

export const Active = () => {
  const { openModalWith } = useModal();
  const { activeAccount } = useConnect();
  const { isSyncing } = useUi();
  const { targets, setTargets, inSetup } = useStaking();
  const { getAccountNominations } = useBalances();
  const nominations = getAccountNominations(activeAccount);

  const ROW_HEIGHT = 275;

  return (
    <>
      <PageTitle title="Nominate" />
      <StatBoxList>
        <MinimumActiveBondStatBox />
        <ActiveNominationsStatBox />
        <InacctiveNominationsStatBox />
      </StatBoxList>
      <ControllerNotImported />
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <RowPrimaryWrapper
          hOrder={1}
          vOrder={0}
          thresholdStickyMenu={SideMenuStickyThreshold}
          thresholdFullWidth={SectionFullWidthThreshold}
        >
          <Status height={ROW_HEIGHT} />
        </RowPrimaryWrapper>
        <RowSecondaryWrapper
          hOrder={0}
          vOrder={1}
          thresholdStickyMenu={SideMenuStickyThreshold}
          thresholdFullWidth={SectionFullWidthThreshold}
        >
          <CardWrapper height={ROW_HEIGHT}>
            <ManageBond />
          </CardWrapper>
        </RowSecondaryWrapper>
      </PageRowWrapper>
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <CardWrapper>
          {nominations.length || inSetup() || isSyncing ? (
            <Nominations bondType="stake" nominator={activeAccount} />
          ) : (
            <>
              <CardHeaderWrapper withAction>
                <h3>
                  Start Nominating
                  <OpenHelpIcon helpKey="Nominations" />
                </h3>
                <div>
                  <Button
                    small
                    inline
                    primary
                    title="Nominate"
                    icon={faChevronCircleRight}
                    transform="grow-1"
                    disabled={targets.length === 0 || inSetup() || isSyncing}
                    onClick={() => openModalWith('Nominate', {}, 'small')}
                  />
                </div>
              </CardHeaderWrapper>
              <GenerateNominations
                batchKey="generate_nominations_active"
                setters={[
                  {
                    set: setTargets,
                    current: targets,
                  },
                ]}
                nominations={targets.nominations}
              />
            </>
          )}
        </CardWrapper>
      </PageRowWrapper>
    </>
  );
};

export default Active;
